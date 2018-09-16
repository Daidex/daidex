import React from 'react'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'

// import Components
import Text from 'src/components/Atoms/Text'
import Button from 'src/components/Atoms/Button'
import Row from 'src/components/Atoms/Row'
// import Col from 'src/components/Atoms/Col'
import Input from 'src/components/Atoms/Input'

import styles from './WrapForm.sass'


const MyCustomInput = (props) => {
  return (
    <Row style={{ display: 'flex' }}>
      <Input
        name="coin"
        type="number"
        placeholder="ETH"
        style={{ ...props.style }}
        className={props.className}
        onChange={props.input.onChange}
      />
    </Row>
  )
}

MyCustomInput.propTypes = {
  input: PropTypes.object.isRequired,
  style: PropTypes.object,
  className: PropTypes.string
}

MyCustomInput.defaultProps = {
  style: {},
  className: ''
}

const WrapForm = (props) => {
  // const { handleSubmit, pristine, reset, submitting } = props;
  const { handleSubmit, pristine, submitting } = props
  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <Text theme="h1" style={{ textAlign: 'center' }}>Wrap ETH</Text>
      <Row>
        <Text className={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Suspendisse a sapien varius, facilisis massa non, commodo purus.
          Morbi vel nisl sed enim ullamcorper feugiat eu nec justo.
        </Text>
      </Row>
      <Row className={styles.balance}>
        <Text>Balance</Text>
        <Text>0.00003234 <span>ETH</span></Text>
      </Row>
      <Row>
        <Field
          name="coin"
          component={MyCustomInput}
          type="number"
          placeholder="ETH"
          className={styles.input}
        />
      </Row>
      <Row style={{ display: 'flex' }}>
        <Button
          type="submit"
          disabled={pristine || submitting}
          className={styles.button}
        >
          Convert to WETH
        </Button>
      </Row>
    </form>
  )
}

WrapForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  // reset: PropTypes.func
}

WrapForm.defaultProps = {
  pristine: false,
  submitting: false,
  // reset: () => {}
}

export default reduxForm({
  form: 'wrap', // a unique identifier for this form
})(WrapForm)
