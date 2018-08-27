import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Web3 from 'web3'
import { ZeroEx } from '0x.js'

import {
  changeView,
  setNetwork,
  initExchange,
  updateAccount,
  updateBalances,
} from 'src/store/actions/appActions'

import Row from 'src/components/Atoms/Row'
import Text from 'src/components/Atoms/Text'
import Header from 'src/components/Organisms/Header'
import MetaMaskWithError from 'src/components/Organisms/MetaMaskWithError'

import appStates from 'src/store/states/appStates'
import { isMetaMask } from 'src/utils'

const TOKEN_DECIMALS = 18
const DECIMALS_TO_SHOW = 9

class Exchange extends Component {
  walletInfoInterval = 0

  static propTypes = {
    wallet: PropTypes.shape({
      address: PropTypes.string,
      balances: PropTypes.shape({
        ETH: PropTypes.string,
        WETH: PropTypes.string,
      })
    }).isRequired,
    network: PropTypes.shape({
      name: PropTypes.string,
    }).isRequired,
    view: PropTypes.string.isRequired,
    changeView: PropTypes.func.isRequired,
    setNetwork: PropTypes.func.isRequired,
    updateAccount: PropTypes.func.isRequired,
    updateBalances: PropTypes.func.isRequired,
    initExchange: PropTypes.func.isRequired,
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

  getBalance = (address, token) => {
    if (token) {
      const {
        network: { tokens },
      } = this.props

      this.zeroEx.token.getBalanceAsync(tokens[token], address)
        .then((balance) => {
          this.props.updateBalances({
            [token]: ZeroEx.toUnitAmount(balance, TOKEN_DECIMALS).toFixed(DECIMALS_TO_SHOW)
          })
        })
        // TODO: handle error
        .catch(err => console.error('Something was wrong:', err))
    } else {
      this.web3.eth.getBalance(address)
        .then(balance => this.props.updateBalances({
          ETH: this.web3.utils.fromWei(balance)
        }))
        // TODO: handle error
        .catch(err => console.error('Something was wrong:', err))
    }
  }

  init = (address) => {
    this.props.initExchange(address)
    this.getBalance(address)
    this.getBalance(address, 'WETH')
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

  shouldShowMetaMaskError = (view) => {
    return (
      view === appStates.view.metaMaskFailToConnect
      || view === appStates.view.metaMaskIsRequired
      || view === appStates.view.metaMaskIsNotMainNet
    )
  }

  renderComingSoon = () => (
    <Row style={{ margin: 20 }}>
      <Text theme="h1">Comming Soon</Text>
      <Text theme="light-text">Network: {this.props.network.name}</Text>
      <Text theme="light-text">Address: {this.props.wallet.address}</Text>
      <Row>
        <Text theme="title">Balances</Text>
        <Text theme="light-text">ETH: {this.props.wallet.balances.ETH}</Text>
        <Text theme="light-text">WETH: {this.props.wallet.balances.WETH}</Text>
      </Row>
    </Row>
  )

  render() {
    const { view } = this.props

    return (
      <Row>
        <Header />
        {this.shouldShowMetaMaskError(view) ? <MetaMaskWithError view={view} /> : this.renderComingSoon()}
      </Row>
    )
  }
}

const mapStateToProps = state => ({
  view: state.app.ui.view,
  previousView: state.app.ui.previousView,
  wallet: state.app.data.wallet,
  network: state.app.data.network,
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    changeView,
    setNetwork,
    initExchange,
    updateAccount,
    updateBalances,
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Exchange)
