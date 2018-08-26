import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Web3 from 'web3'

import {
  changeView,
  setNetwork,
  initExchange,
  setWallet,
} from 'src/store/actions/appActions'

import Row from 'src/components/Atoms/Row'
import Header from 'src/components/Organisms/Header'
import MetaMaskWithError from 'src/components/Organisms/MetaMaskWithError'

import appStates from 'src/store/states/appStates'
import { isMetaMask } from 'src/utils'

class Exchange extends Component {
  walletInfoInterval = 0

  static propTypes = {
    wallet: PropTypes.shape({}).isRequired,
    view: PropTypes.string.isRequired,
    changeView: PropTypes.func.isRequired,
    setNetwork: PropTypes.func.isRequired,
    setWallet: PropTypes.func.isRequired,
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
        this.props.initExchange(address)
      } else {
        this.props.changeView(appStates.view.metaMaskFailToConnect)
      }

      this.watchWalletChanged()
    })
  }

  validateMetaMask = () => {
    if (isMetaMask()) {
      this.web3 = new Web3(global.web3.currentProvider)

      this.web3.eth.net.getId()
        .then((networkId) => {
          this.props.setNetwork(networkId)
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
            this.props.initExchange(currentAddress)
          }
        } else if (currentAddress !== address) {
          this.props.setWallet({ address: currentAddress })
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

  render() {
    const { view } = this.props

    return (
      <Row>
        <Header />
        {this.shouldShowMetaMaskError(view) && <MetaMaskWithError />}
      </Row>
    )
  }
}

const mapStateToProps = state => ({
  view: state.app.ui.view,
  previousView: state.app.ui.previousView,
  wallet: state.app.data.wallet,
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    changeView,
    setNetwork,
    initExchange,
    setWallet,
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Exchange)
