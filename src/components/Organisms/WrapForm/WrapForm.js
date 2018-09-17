import React from 'react'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'

// import Components
import Text from 'src/components/Atoms/Text'
import Button from 'src/components/Atoms/Button'
import Row from 'src/components/Atoms/Row'
import InputRedux from 'src/components/Molecules/InputRedux'

import styles from './WrapForm.sass'
import copies from './copies.json'

const WrapForm = ({
  handleSubmit,
  pristine,
  submitting,
  wrap,
  balances,
}) => {
  const texts = wrap ? copies.wrap : copies.unwrap
  const balance = wrap ? balances.ETH : balances.WETH
  return (
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
          balance > 0 ? null : <Text className={styles.warning}>Lorem Ipsum dolor sit amet</Text>
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
  )
}

WrapForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  wrap: PropTypes.bool,
  balances: PropTypes.object.isRequired,
  // reset: PropTypes.func
}

WrapForm.defaultProps = {
  pristine: false,
  submitting: false,
  wrap: true,
  // reset: () => {}
}

export default reduxForm({
  form: 'wrap', // a unique identifier for this form
})(WrapForm)
