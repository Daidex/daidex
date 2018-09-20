import React, { Component } from 'react'
import { get } from 'lodash'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'

// import Components
import Text from 'src/components/Atoms/Text'
import Button from 'src/components/Atoms/Button'
import Row from 'src/components/Atoms/Row'
import InputRedux from 'src/components/Molecules/InputRedux'
import Loader from 'src/components/Atoms/Loader'
import Message from 'src/components/Atoms/Message'

import styles from './WrapForm.sass'
import copies from './copies.json'

class WrapForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    wrap: PropTypes.bool,
    balances: PropTypes.object.isRequired,
    message: PropTypes.shape({
      type: PropTypes.string,
      msg: PropTypes.string,
    }).isRequired,
    setMessageWrap: PropTypes.func.isRequired,
    // reset: PropTypes.func
  }

  static defaultProps = {
    pristine: false,
    submitting: false,
    wrap: true,
    // reset: () => {}
  }

  componentDidMount() {
    // set warning message to state, for WrapForm
    const balance = this.props.wrap
      ? get(this.props.balances, 'ETH.balance', 0)
      : get(this.props.balances, 'WETH.balance', 0)
    if (!parseFloat(balance)) {
      this.props.setMessageWrap({
        msg: 'No tienes fondos suficientes.',
        type: 'warning'
      })
    }
  }

  componentWillUnmount() {
    this.props.setMessageWrap({ msg: '', type: '' })
  }

  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      wrap,
      balances,
      message: { type, msg },
    } = this.props

    const texts = wrap ? copies.wrap : copies.unwrap
    const balance = wrap
      ? get(balances, 'ETH.balance', 0)
      : get(balances, 'WETH.balance', 0)

    return (
      <Row>
        {
          submitting && <Loader size="72" />
        }
        <form onSubmit={handleSubmit} className={styles.container}>
          <Text theme="h1" style={{ textAlign: 'center' }}>
            { texts.title }
          </Text>
          <Row>
            <Text className={styles.description}>
              { texts.description }
            </Text>
          </Row>
          <Row className={styles.balance}>
            <Text>Balance</Text>
            <Text>{ balance } <span>{ texts.symbol }</span></Text>
          </Row>
          <Row>
            {
              type && (
                <Message type={type}>
                  {msg}
                </Message>
              )
            }
            <Field
              name="coin"
              component={InputRedux}
              type="number"
              placeholder={texts.symbol}
              className={styles.input}
              disabled={balance <= 0}
            />
          </Row>
          <Row style={{ display: 'flex' }}>
            <Button
              type="submit"
              disabled={pristine || submitting}
              className={styles.button}
            >
              Convert to { texts.antonym }
            </Button>
          </Row>
        </form>
      </Row>
    )
  }
}

export default reduxForm({
  form: 'wrap', // a unique identifier for this form
})(WrapForm)
