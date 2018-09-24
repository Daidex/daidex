import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import classnames from 'classnames'

import { convertTokenTo } from 'src/services/currency'

import Row from 'src/components/Atoms/Row'
import Col from 'src/components/Atoms/Col'
import Text from 'src/components/Atoms/Text'
import Button from 'src/components/Atoms/Button'
import Icon from 'src/components/Atoms/Icon'
import Dropdown from 'src/components/Molecules/Dropdown'
import InputRedux from 'src/components/Molecules/InputRedux'

import copies from './copies.json'
import styles from './TradeFormStyles.sass'

class TradeForm extends Component {
  static propTypes = {
    className: PropTypes.string,
    tokens: PropTypes.array.isRequired,
  }

  static defaultProps = {
    className: ''
  }

  state = {
    takerChoice: '',
    makerChoice: '',
    tokenCurrencyRate: 0,
  }

  componentDidMount() {}

  getCurrencyRate = ({ from, to }) => {
    convertTokenTo({ from, to })
      .then(rate => this.setState({ tokenCurrencyRate: rate }))
      .catch(console.log)
  }

  handleInputChange = (value) => {
    this.setState(() => ({
      takerValue: value
    }))
  }

  handleSubmit = (values) => {
    console.log('values', values)
  }

  handleSelection = (value, key) => {
    this.setState({ [key]: value }, () => {
      this.getCurrencyRate({
        from: this.state.takerChoice !== 'WETH' ? this.state.takerChoice : 'ETH',
        to: this.state.makerChoice !== 'WETH' ? this.state.makerChoice : 'ETH',
      })
    })
  }

  render() {
    const { className, tokens } = this.props
    const {
      takerChoice, makerChoice, tokenCurrencyRate, takerValue
    } = this.state

    const classNames = classnames(styles.container, {
      [className]: !!className
    })

    const makerValue = (takerValue * tokenCurrencyRate)

    return (
      <form
        className={classNames}
        style={{ marginRight: '20px' }}
        onSubmit={this.handleSubmit}
      >
        <Text component="h3" theme="h3">{copies.form_title}</Text>
        <Row className={styles.soldContainer}>
          <Col>
            <Text theme="light-text" component="span">{copies.sold_label}</Text>
          </Col>
          <Dropdown
            theme="tokens"
            spacing={{ left: 0, right: 0 }}
            className={styles.dropdown}
            label="Seleccione un token"
            source={tokens.filter(token => token.value !== makerChoice)}
            onChange={({ value }) => this.handleSelection(value, 'takerChoice')}
          />
          <Field
            name="taker"
            component={InputRedux}
            type="number"
            className={styles.input}
            placeholder="Cantidad a vender"
            onChange={(e, newValue) => {
              this.handleInputChange(newValue)
            }}
            disabled={!takerChoice}
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
            spacing={{ left: 0, right: 0 }}
            className={styles.dropdown}
            label="Seleccione un token"
            source={tokens.filter(token => token.value !== takerChoice)}
            onChange={({ value }) => this.handleSelection(value, 'makerChoice')}
          />
          <InputRedux
            name="maker"
            type="number"
            className={styles.input}
            value={makerValue ? parseFloat(makerValue.toFixed(8)) : makerValue}
            placeholder="Cantidad aproximada a recibir"
            disabled
          />
        </Row>
        <Row className={styles.action}>
          <Text className={styles.textBase}>
            {takerChoice && makerChoice
              ? `1 ${takerChoice} = ${tokenCurrencyRate} ${makerChoice}`
              : null
            }
          </Text>
          <Col>
            <Button
              type="submit"
              theme="secondary"
              onClick={() => console.log('Trade')}
            >
              {copies.cta_label}
            </Button>
          </Col>
        </Row>
      </form>
    )
  }
}

const maptStateToProps = state => ({
  tokens: Object.keys(state.app.data.network.tokens)
    .reduce((result, curr) => ([
      ...result,
      {
        value: curr,
        label: curr
      }
    ]), [])
})

const TradeFormConnected = connect(maptStateToProps, {})(TradeForm)

export default reduxForm({
  form: 'trading'
})(TradeFormConnected)
