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
}) => {
  const texts = wrap ? copies.wrap : copies.unwrap
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
        <Text>0.00003234 <span>{ texts.symbol }</span></Text>
      </Row>
      <Row>
        <Field
          name="coin"
          component={InputRedux}
          type="number"
          placeholder={texts.symbol}
          className={styles.input}
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
