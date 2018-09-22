import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { map, isUndefined } from 'lodash'

import { updateAllowence } from 'src/store/actions/appActions'
import ZeroExWrapper from 'src/services/0xService'

import Row from 'src/components/Atoms/Row'
import Switch from 'src/components/Molecules/AllowenceSwitch'
import styles from './TradeTableStyles.sass'

const defaultHeaders = ['Simbolo', 'Nombre', 'Estado', 'Balance', 'Valor (MXN)']

class TradeTable extends Component {
  static propTypes = {
    openWrapModal: PropTypes.func.isRequired,
    headers: PropTypes.array,
    data: PropTypes.oneOfType([
      PropTypes.shape({}),
      PropTypes.array,
    ]).isRequired,
    network: PropTypes.shape({
      id: PropTypes.number,
      tokens: PropTypes.shape({})
    }).isRequired,
    updateAllowence: PropTypes.func.isRequired,
    accountAddress: PropTypes.string,
    currencyRate: PropTypes.shape({
      ETH: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ])
    }).isRequired,
  }

  static defaultProps = {
    headers: defaultHeaders,
    accountAddress: ''
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.accountAddress !== nextProps.accountAddress
      && !isUndefined(nextProps.accountAddress)
    ) {
      this.zeroService = new ZeroExWrapper({
        currentProvider: global.web3.currentProvider,
        networkId: nextProps.network.id
      })
    }
  }

  getCurrencyRateValue = (value, symbol) => {
    let convertedValue

    if (symbol !== 'WETH') {
      convertedValue = this.props.currencyRate[symbol] * value
    } else {
      convertedValue = this.props.currencyRate.ETH * value
    }

    return !Number.isNaN(convertedValue)
      ? convertedValue.toLocaleString('de-DE', { currency: 'MXN', maximumFractionDigits: 2 })
      : '0'
  }

  updateAllowence = (item, checked) => {
    const { network: { tokens }, accountAddress } = this.props

    this.props.updateAllowence({
      tokenSymbol: item.symbol,
      state: 'loading'
    })

    const tokenAddress = tokens[item.symbol]

    this.zeroService.modifyAllowence({
      tokenAddress,
      accountAddress,
      enable: checked
    })
      .then(() => this.props.updateAllowence({
        tokenSymbol: item.symbol,
        state: checked
      }))
      .catch(() => this.props.updateAllowence({
        tokenSymbol: item.symbol,
        state: !checked,
      }))
  }

  handleAfterClick = (ev, symbol) => {
    if (
      ev.nativeEvent.offsetX > ev.target.offsetWidth
      && (symbol === 'ETH' || symbol === 'WETH')
    ) {
      const isWrap = symbol === 'ETH'
      this.props.openWrapModal(isWrap)
    }
  }

  render() {
    const { headers, data } = this.props
    return (
      <Row withoutSpacing style={{ margin: '0 20px' }}>
        <Row spacing={{ top: 0, bottom: 5 }}>
          <table className={classnames(styles.container, styles.spacing)}>
            <tbody>
              <tr>
                {map(headers, title => <th key={title}>{title}</th>)}
              </tr>
              {map(data, item => (
                <tr key={item.symbol} className={styles.collapse}>
                  <td>
                    <span>{item.symbol}</span>
                  </td>
                  <td>
                    <span>{item.name}</span>
                  </td>
                  <td>
                    <span>
                      <Switch
                        isController
                        disabled={item.symbol === 'ETH'}
                        state={item.symbol === 'ETH' ? true : item.enabled}
                        onChange={() => {}}
                      />
                    </span>
                  </td>
                  <td>
                    <span>{item.balance}</span>
                  </td>
                  <td>
                    <span>${this.getCurrencyRateValue(item.balance, item.symbol)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Row>
        <Row>
          <table className={classnames(styles.container, styles.body)}>
            <tbody>
              <tr className={styles.collapse}>
                {map(headers, title => <th key={title}>{title}</th>)}
              </tr>
              {map(data, (item, index) => (
                <tr key={item.symbol} data-token={item.symbol}>
                  <td>
                    <span>{item.symbol}</span>
                  </td>
                  <td>
                    <span
                      onClick={index > 2
                        ? () => null
                        : ev => this.handleAfterClick(ev, item.symbol)
                      }
                    >
                      {item.name}
                    </span>
                  </td>
                  <td>
                    <span>
                      <Switch
                        isController
                        disabled={item.symbol === 'ETH'}
                        state={item.symbol === 'ETH' ? true : item.enabled}
                        onChange={checked => this.updateAllowence(item, checked)}
                      />
                    </span>
                  </td>
                  <td>
                    <span>{item.balance}</span>
                  </td>
                  <td>
                    <span>${this.getCurrencyRateValue(item.balance, item.symbol)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Row>
      </Row>
    )
  }
}

const mapStateToProps = state => ({
  network: state.app.data.network,
  data: state.app.data.wallet.balances,
  accountAddress: state.app.data.wallet.address,
  currencyRate: state.app.data.currencyRate,
})

export default connect(mapStateToProps, {
  updateAllowence,
})(TradeTable)
