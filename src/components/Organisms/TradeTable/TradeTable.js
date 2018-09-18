import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { map } from 'lodash'

import Row from 'src/components/Atoms/Row'
import Switch from 'src/components/Atoms/Switch'
import styles from './TradeTableStyles.sass'

const defaultHeaders = ['Simbolo', 'Nombre', 'Estado', 'Balance', 'Valor (MXN)']
const defaultData = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    enabled: true,
    balance: 0.0000132,
    value: 1000.00
  },
  {
    symbol: 'WETH',
    name: 'Wrapper ETH',
    enabled: true,
    balance: 0.0000123,
    value: 500.00
  },
  {
    symbol: 'DAI',
    name: 'DAI',
    enabled: true,
    balance: 0.0000132,
    value: 1000.00
  }
]

class TradeTable extends Component {
  static propTypes = {
    openWrapModal: PropTypes.func.isRequired,
    headers: PropTypes.array,
    data: PropTypes.arrayOf(PropTypes.shape({
      symbol: PropTypes.string,
      name: PropTypes.string,
      enabled: PropTypes.bool,
      balance: PropTypes.number,
      value: PropTypes.number
    }))
  }

  static defaultProps = {
    headers: defaultHeaders,
    data: defaultData,
  }

  componentDidMount() {}

  handleAfterClick = (ev, symbol) => {
    if (ev.nativeEvent.offsetX > ev.target.offsetWidth) {
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
                        // isController
                        checked={item.enabled}
                        onChange={checked => console.log('allowed', checked)}
                      />
                    </span>
                  </td>
                  <td>
                    <span>{item.balance}</span>
                  </td>
                  <td>
                    <span>${item.value.toLocaleString()}</span>
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
                        // isController
                        checked={item.enabled}
                        onChange={checked => console.log('allowed', checked)}
                      />
                    </span>
                  </td>
                  <td>
                    <span>{item.balance}</span>
                  </td>
                  <td>
                    <span>${item.value.toLocaleString()}</span>
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
  data: state.app.data.wallet.balances
})

export default connect(mapStateToProps, {})(TradeTable)
