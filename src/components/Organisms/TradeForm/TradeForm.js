import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Row from 'src/components/Atoms/Row'
import Col from 'src/components/Atoms/Col'
import Text from 'src/components/Atoms/Text'
import Button from 'src/components/Atoms/Button'
import Icon from 'src/components/Atoms/Icon'
import Dropdown from 'src/components/Molecules/Dropdown'
import TradeInput from 'src/components/Molecules/TradeInput'

import copies from './copies.json'
import styles from './TradeFormStyles.sass'

class TradeForm extends Component {
  static propTypes = {
    maxValue: PropTypes.number,
    className: PropTypes.string,
  }

  static defaultProps = {
    maxValue: 300,
    className: ''
  }

  state = {
    value: 100,
  }

  componentDidMount() {}

  handleOnChange = (value) => {
    this.setState({ value: Number(value) })
  }

  handleOnMaxPress = () => {
    this.setState({ value: this.props.maxValue })
  }

  render() {
    const { className } = this.props

    const classNames = classnames(styles.container, {
      [className]: !!className
    })

    return (
      <Row className={classNames} withoutSpacing>
        <Text component="h3" theme="form-title">{copies.form_title}</Text>
        <Row className={styles.soldContainer}>
          <Col>
            <Text theme="light-text" component="span">{copies.sold_label}</Text>
          </Col>
          <Dropdown
            theme="tokens"
            className={styles.dropdown}
            label="Choose an option"
            source={[
              {
                value: 'ETH',
                label: 'ETH',
              },
              {
                value: 'WETH',
                label: 'WETH'
              }
            ]}
          />
          <TradeInput
            onMaxPress={this.handleOnMaxPress}
            onChange={this.handleOnChange}
            payload={{
              token: 'WETH',
              value: this.state.value
            }}
            autoSize
          />
        </Row>
        <Row withoutSpacing className={styles.iconContainer}>
          <Icon theme="exchange-green" name="exchange-arrows" />
        </Row>
        <Row className={styles.buyContainer}>
          <Col>
            <Text theme="light-text" component="span">{copies.buy_label}</Text>
          </Col>
          <Dropdown
            theme="tokens"
            className={styles.dropdown}
            label="Choose an option"
            source={[
              {
                value: 'ETH',
                label: 'ETH',
              },
              {
                value: 'WETH',
                label: 'WETH'
              }
            ]}
          />
          <TradeInput
            onMaxPress={this.handleOnMaxPress}
            onChange={this.handleOnChange}
            payload={{
              token: 'WETH',
              value: this.state.value
            }}
            autoSize
          />
        </Row>
        <Row className={styles.action}>
          <Text className={styles.textBase}>1 WETH = 57.991851 ZRX</Text>
          <Col>
            <Button theme="secondary" onClick={() => console.log('Trade')}>{copies.cta_label}</Button>
          </Col>
        </Row>
      </Row>
    )
  }
}

export default TradeForm
