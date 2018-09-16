import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import Row from 'src/components/Atoms/Row'
import Switch from 'src/components/Atoms/Switch'
import styles from './TradeTableStyles.sass'

const defaultHeaders = ['Simbolo', 'Nombre', 'Estado', 'Balance', 'Valor (MXN)']
const defaultData = [
  {
    symbol: 'WETH',
    name: 'Wrapper ETH',
    enabled: true,
    balance: 0.0000123,
    value: 500.00
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    enabled: true,
    balance: 0.0000132,
    value: 1000.00
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

  handleAfterClick = (ev) => {
    if (ev.nativeEvent.offsetX > ev.target.offsetWidth) {
      console.log('wrap/unwrap button')
    }
  }

  render() {
    const { headers, data } = this.props
    return (
      <Row>
        <Row>
          <table className={classnames(styles.container, styles.spacing)}>
            <tbody>
              <tr>
                {headers.map(title => <th key={title}>{title}</th>)}
              </tr>
              {data.map(item => (
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
                {headers.map(title => <th key={title}>{title}</th>)}
              </tr>
              {data.map((item, index) => (
                <tr key={item.symbol}>
                  <td>
                    <span>{item.symbol}</span>
                  </td>
                  <td>
                    <span
                      onClick={index > 2
                        ? () => null
                        : ev => this.handleAfterClick(ev, item)
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

export default TradeTable
