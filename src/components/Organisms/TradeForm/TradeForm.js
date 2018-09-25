import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { isEqual, isUndefined } from 'lodash'
import classnames from 'classnames'

import Exchange from 'src/services/Exchange'

import {
  setDropdownOption
} from 'src/store/actions/appActions'

import { convertTokenTo } from 'src/services/currency'

import Row from 'src/components/Atoms/Row'
import Col from 'src/components/Atoms/Col'
import Loader from 'src/components/Atoms/Loader'
import Text from 'src/components/Atoms/Text'
import Button from 'src/components/Atoms/Button'
import Icon from 'src/components/Atoms/Icon'
import Dropdown from 'src/components/Molecules/Dropdown'
import InputRedux from 'src/components/Molecules/InputRedux'

import validate from './validate'

import copies from './copies.json'
import styles from './TradeFormStyles.sass'

class TradeForm extends Component {
  static propTypes = {
    className: PropTypes.string,
    tokens: PropTypes.array.isRequired,
    dropdown: PropTypes.object.isRequired,
    setDropdownOption: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    network: PropTypes.object.isRequired,
    accountAddress: PropTypes.string,
    tokensAddress: PropTypes.object.isRequired,
    orderbook: PropTypes.object.isRequired, // eslint-disable-line
    updateTokenBalance: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    openMessageWarn: PropTypes.func.isRequired,
    setMessageWarn: PropTypes.func.isRequired,
  }

  static defaultProps = {
    className: '',
    accountAddress: ''
  }

  state = {
    tokenCurrencyRate: 0,
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    if (
      !isEqual(nextProps.dropdown, this.props.dropdown)
      && nextProps.dropdown.makerChoice
    ) {
      this.updateAmountToReceive(nextProps, this.state.takerValue)
      this.getCurrencyRate({
        from: nextProps.dropdown.takerChoice,
        to: nextProps.dropdown.makerChoice,
      })
    }

    if (
      this.props.accountAddress !== nextProps.accountAddress
      && !isUndefined(nextProps.accountAddress)
    ) {
      this.exchangeService = new Exchange({
        radarRelayApi: nextProps.network.radarRelayApi,
        clientAddress: nextProps.accountAddress,
        currentProvider: global.web3.currentProvider,
        networkId: nextProps.network.id,
        tokens: nextProps.tokensAddress,
      })
    }
  }

  getCurrencyRate = ({ from, to }) => {
    convertTokenTo({ from, to })
      .then(rate => this.setState({ tokenCurrencyRate: rate }))
      .catch(console.log)
  }

  handleInputChange = async (value) => {
    this.updateAmountToReceive(this.props, value)

    this.setState(() => ({
      takerValue: value
    }))
  }

  updateAmountToReceive = async (props = this.props, value) => {
    const {
      tokensAddress,
      orderbook,
      dropdown: { takerChoice, makerChoice }
    } = props

    if (value) {
      if (takerChoice === 'WETH' && makerChoice) {
        const token = tokensAddress[makerChoice]
        const order = orderbook[token]
        const amountToReceive = await this.exchangeService
          .getAmountToReceive(parseFloat(value), order.bids)

        this.setState({ amountToReceive })
      } else if (takerChoice && makerChoice) {
        const token = tokensAddress[takerChoice]
        const order = orderbook[token]
        const amountToReceive = await this.exchangeService
          .getAmountToReceive(parseFloat(value), order.asks)
        this.setState({ amountToReceive })
      }
    }
  }

  handleSubmit = async (values) => {
    const {
      invalid,
      submitting,
      accountAddress,
      openMessageWarn,
      setMessageWarn,
      dropdown: { takerChoice, makerChoice },
    } = this.props

    if (!invalid && !submitting) {
      const tokenA = takerChoice !== 'WETH' ? takerChoice : makerChoice

      try {
        const response = await this.exchangeService.makeTrading({
          amount: values.taker,
          willPayWithWETH: takerChoice === 'WETH',
          tokenA,
        })
        console.log('response yay', response)
        setMessageWarn({
          type: 'success',
          title: 'Transacción Exitosa',
          payload: {}
        })
        openMessageWarn()

        setTimeout(() => {
          this.props.updateTokenBalance(accountAddress, takerChoice)
          this.props.updateTokenBalance(accountAddress, makerChoice)
        }, 2000)
      } catch (error) {
        console.error(error)
        setMessageWarn({
          type: error.name.toLocaleLowerCase(),
          title: 'Error Lorem Ipsum',
          payload: {
            error: error.message
          }
        })
        openMessageWarn()
      }
    }
  }

  handleSelection = (value, key) => {
    this.props.setDropdownOption({ key, value })
  }

  render() {
    const {
      className,
      tokens,
      dropdown: { takerChoice, makerChoice },
      invalid,
      submitting,
      handleSubmit,
    } = this.props
    const { tokenCurrencyRate, amountToReceive = 0 } = this.state

    const classNames = classnames(styles.container, {
      [className]: !!className
    })

    return (
      <div style={{ position: 'relative' }} className={className}>
        {submitting && <Loader size="72" />}
        <form
          className={classNames}
          style={{ marginRight: '20px' }}
          onSubmit={handleSubmit(this.handleSubmit)}
        >
          <Text component="h3" theme="h3">{copies.form_title}</Text>
          <Row className={styles.soldContainer}>
            <Col>
              <Text theme="light-text" component="span">{copies.sold_label}</Text>
            </Col>
            <Dropdown
              theme="tokens"
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
              step="0.000001"
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
              className={styles.dropdown}
              label="Seleccione un token"
              source={tokens.filter(token => token.value !== takerChoice)}
              onChange={({ value }) => this.handleSelection(value, 'makerChoice')}
            />
            <InputRedux
              name="maker"
              type="number"
              className={styles.input}
              value={amountToReceive}
              placeholder="Cantidad aproximada a recibir"
              disabled
            />
          </Row>
          <Row className={styles.action}>
            <Text className={styles.textBase} style={{ display: 'none' }}>
              {takerChoice && makerChoice
                ? `1 ${takerChoice} = ${tokenCurrencyRate} ${makerChoice}`
                : ''
              }
            </Text>
            <Col>
              <Button
                type="submit"
                theme="secondary"
                disabled={invalid || submitting}
              >
                {copies.cta_label}
              </Button>
            </Col>
          </Row>
        </form>
      </div>
    )
  }
}

const maptStateToProps = state => ({
  dropdown: state.app.data.dropdown,
  network: state.app.data.network,
  accountAddress: state.app.data.wallet.address,
  tokensAddress: state.app.data.network.tokens,
  orderbook: state.app.data.orderbook,
  tokens: Object.keys(state.app.data.network.tokens)
    .reduce((result, curr) => ([
      ...result,
      {
        value: curr,
        label: curr
      }
    ]), [])
})

const TradeFormConnected = connect(maptStateToProps, {
  setDropdownOption
})(TradeForm)

export default reduxForm({
  form: 'trading',
  validate
})(TradeFormConnected)
