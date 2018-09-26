import 'babel-polyfill'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Web3 from 'web3'
import { ZeroEx } from '0x.js'
import { wrap_ether, unwrap_ether } from 'src/methods/wrap-unwrap'
import { get } from 'lodash'

import {
  changeView,
  setNetwork,
  initExchange,
  updateAccount,
  updateBalances,
  setMessageWrap,
  getCurrencyExchange,
  subscribeToOrderbook,
  setMessageWarn,
} from 'src/store/actions/appActions'

import Row from 'src/components/Atoms/Row'
import Header from 'src/components/Organisms/Header'
import TradeTable from 'src/components/Organisms/TradeTable'
import TradeForm from 'src/components/Organisms/TradeForm'
import MetaMaskWithError from 'src/components/Organisms/MetaMaskWithError'
import Modal from 'src/components/Molecules/Modal'
import Warning from 'src/components/Molecules/Warning'
import WrapForm from 'src/components/Organisms/WrapForm'

import appStates from 'src/store/states/appStates'
import { isMetaMask } from 'src/utils'

import styles from './ExchangeStyles.sass'

const TOKEN_DECIMALS = 18
const DECIMALS_TO_SHOW = 9

class Exchange extends Component {
  walletInfoInterval = 0

  static propTypes = {
    wallet: PropTypes.shape({
      address: PropTypes.string,
      balances: PropTypes.shape({
        ETH: PropTypes.object,
        WETH: PropTypes.object,
      })
    }).isRequired,
    network: PropTypes.shape({
      name: PropTypes.string,
      tokens: PropTypes.object,
    }).isRequired,
    view: PropTypes.string.isRequired,
    wrap_message: PropTypes.shape({
      type: PropTypes.string,
      msg: PropTypes.string,
    }).isRequired,
    warn_message: PropTypes.object.isRequired,
    previousView: PropTypes.string.isRequired,
    changeView: PropTypes.func.isRequired,
    setNetwork: PropTypes.func.isRequired,
    updateAccount: PropTypes.func.isRequired,
    updateBalances: PropTypes.func.isRequired,
    initExchange: PropTypes.func.isRequired,
    setMessageWrap: PropTypes.func.isRequired,
    getCurrencyExchange: PropTypes.func.isRequired,
    subscribeToOrderbook: PropTypes.func.isRequired,
    setMessageWarn: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.validateMetaMask()
  }

  componentWillUnmount() {
    if (this.walletInfoInterval) {
      clearInterval(this.walletInfoInterval)
    }
  }

  getAccountData = () => {
    this.web3.eth.getAccounts((err, [address] = []) => {
      if (err) {
        this.props.changeView(appStates.view.metaMaskFailToConnect)
      } else if (address) {
        this.init(address)
      } else {
        this.props.changeView(appStates.view.metaMaskFailToConnect)
      }

      this.watchWalletChanged()
    })
  }

  getBalance = (address, token, callback = () => {}) => {
    if (token) {
      const {
        network: { tokens },
      } = this.props

      Promise.all([
        this.zeroEx.token.getBalanceAsync(tokens[token], address),
        this.zeroEx.token.getProxyAllowanceAsync(tokens[token], address)
      ])
        .then(([balance, allowAmount]) => {
          this.props.updateBalances({
            [token]: {
              balance: ZeroEx.toUnitAmount(balance, TOKEN_DECIMALS).toFixed(DECIMALS_TO_SHOW),
              enabled: allowAmount.toNumber() > 0
            }
          })
        })
        // TODO: handle error
        .catch(err => console.error('Something was wrong:', err))
    } else {
      this.web3.eth.getBalance(address)
        .then((balance) => {
          const eth = this.web3.utils.fromWei(balance)
          this.props.updateBalances({
            ETH: {
              balance: eth
            }
          })
          callback(eth)
        })
        // TODO: handle error
        .catch(err => console.error('Something was wrong:', err))
    }
  }

  init = (address) => {
    const {
      network: { tokens, websocket },
    } = this.props

    const tokensKeys = Object.keys(tokens)
    this.props.initExchange(address)
    this.props.getCurrencyExchange(tokensKeys)
    this.props.subscribeToOrderbook(websocket, tokens)
    this.getBalance(address)

    tokensKeys.forEach((token) => {
      this.getBalance(address, token)
    })
  }

  validateMetaMask = () => {
    if (isMetaMask()) {
      this.web3 = new Web3(global.web3.currentProvider)

      this.web3.eth.net.getId()
        .then((networkId) => {
          this.props.setNetwork(networkId)
          this.zeroEx = new ZeroEx(global.web3.currentProvider, { networkId });
          this.getAccountData()
        })
        .catch(() => {
          this.props.changeView(appStates.view.metaMaskFailToConnect)
        })
    } else {
      this.props.changeView(appStates.view.metaMaskIsRequired)
    }
  }

  watchWalletChanged = () => {
    this.walletInfoInterval = setInterval(() => {
      this.web3.eth.getAccounts((err, [currentAddress] = []) => {
        const { wallet: { address } } = this.props

        if (currentAddress) {
          if (currentAddress !== address) {
            this.init(currentAddress)
          }
        } else if (currentAddress !== address) {
          this.props.updateAccount({ address: currentAddress })
          this.props.changeView(appStates.view.metaMaskFailToConnect)
        }
      })
    }, 1000)
  }

  showResults = values => (
    window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`) // eslint-disable-line
  )

  shouldShowMetaMaskError = (view) => {
    return (
      view === appStates.view.metaMaskFailToConnect
      || view === appStates.view.metaMaskIsRequired
      || view === appStates.view.metaMaskIsNotMainNet
    )
  }

  closeWrapModal = () => {
    this.props.changeView(this.props.previousView)
  }

  openWrapModal = (isWrap = true) => {
    this.props.changeView(
      isWrap
        ? appStates.view.exchangeWrap
        : appStates.view.exchangeUnWrap
    )
  }

  openMessageWarn = () => {
    this.props.changeView(appStates.view.exchangeWarning)
  }

  actionWrapUnwrap = async (values) => {
    const wrap = this.props.view === appStates.view.exchangeWrap
    const amount = parseFloat(values.coin)
    const balance = get(
      this.props.wallet.balances,
      `${wrap ? 'ETH' : 'WETH'}.balance`,
      0
    )
    const token = get(this.props.network.tokens, 'WETH', 0)
    const wrap_unwrap_method = wrap ? wrap_ether : unwrap_ether

    if (balance > amount && amount > 0 && balance > 0) {
      let msg;
      msg = await wrap_unwrap_method(amount, token)
      if (String(msg).substring(0, 2) !== '0x') {
        // set error to state
        this.props.setMessageWrap({
          msg: 'transacción cancelada.',
          type: 'error'
        })
      } else {
        msg = String(msg)
        // set message to state
        this.props.setMessageWrap({
          msg: 'Transacción aceptada.',
          type: 'success'
        })
        // await Transaction mined
        await this.zeroEx.awaitTransactionMinedAsync(msg, 1500)
        // set message to state
        this.props.setMessageWrap({
          msg: 'Transacción confirmada.',
          type: 'success'
        })
        // Updating ETH/WETH balances
        this.getBalance(this.props.wallet.address, 'WETH')
        const ethBalance = get(this.props.wallet.balances, 'ETH.balance', 0)
        const updateBalance = setInterval(() => {
          this.getBalance(this.props.wallet.address, null, (currentBalance) => {
            if (ethBalance !== currentBalance) {
              clearInterval(updateBalance)
            }
          })
        }, 1500)
      }
    } else if (!amount) {
      this.props.setMessageWrap({
        msg: 'Introduce una cantidad real.',
        type: 'warning'
      })
    } else if (amount > balance) {
      this.props.setMessageWrap({
        msg: 'No tienes fondos suficientes.',
        type: 'warning'
      })
    } else {
      this.props.setMessageWrap({
        msg: 'Algo ha ido mal.',
        type: 'error'
      })
    }
  }

  render() {
    const { view } = this.props
    return (
      <Row>
        <Header
          connected={!!this.props.wallet.address}
          address={this.props.wallet.address}
        />
        <Modal
          isVisible={(
            view === appStates.view.exchangeWrap
            || view === appStates.view.exchangeUnWrap
          )}
          onCloseModal={this.closeWrapModal}
        >
          <WrapForm
            onSubmit={this.actionWrapUnwrap}
            wrap={view === appStates.view.exchangeWrap}
            balances={this.props.wallet.balances}
            message={this.props.wrap_message}
            setMessageWrap={this.props.setMessageWrap}
          />
        </Modal>
        <Modal
          isVisible={(
            view === appStates.view.exchangeWarning
          )}
          onCloseModal={this.closeWrapModal}
        >
          <Warning
            type={this.props.warn_message.type}
            title={this.props.warn_message.title}
            payload={this.props.warn_message.payload}
            onClose={this.closeWrapModal}
          />
        </Modal>
        {!this.shouldShowMetaMaskError(view)
          ? (
            <Row className={styles.content}>
              <TradeTable
                openWrapModal={this.openWrapModal}
              />
              <TradeForm
                className={styles.form}
                updateTokenBalance={this.getBalance}
                setMessageWarn={this.props.setMessageWarn}
                openMessageWarn={this.openMessageWarn}
              />
            </Row>
          ) : <MetaMaskWithError view={view} />
        }
      </Row>
    )
  }
}

const mapStateToProps = state => ({
  view: state.app.ui.view,
  previousView: state.app.ui.previousView,
  wallet: state.app.data.wallet,
  network: state.app.data.network,
  wrap_message: state.app.ui.wrap.message,
  warn_message: state.app.ui.warnMessage,
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    changeView,
    setNetwork,
    initExchange,
    updateAccount,
    updateBalances,
    setMessageWrap,
    getCurrencyExchange,
    subscribeToOrderbook,
    setMessageWarn,
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Exchange)
