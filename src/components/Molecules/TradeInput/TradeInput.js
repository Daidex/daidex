import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Row from 'src/components/Atoms/Row'
import Col from 'src/components/Atoms/Col'
import Input from 'src/components/Atoms/Input'
import Text from 'src/components/Atoms/Text'
import Button from 'src/components/Atoms/Button'

import styles from './TradeInputStyles.sass'

const TradeInput = ({
  className,
  onChange,
  payload,
  placeholder,
  onMaxPress,
  ...rest
}) => {
  const classNames = classnames(styles.container, {
    [className]: !!className,
  })

  return (
    <Row className={classNames}>
      <Col className={styles.inputContainer}>
        <Input
          type="number"
          theme="transparent"
          onChange={onChange}
          value={payload.value}
          placeholder={placeholder}
          min="0"
          {...rest}
        />
        <Text component="span" className={styles.token}>
          {payload.token}
        </Text>
      </Col>
      <Col>
        <Button
          theme="outline-black"
          onClick={onMaxPress}
        >
          MAX
        </Button>
      </Col>
    </Row>
  )
}

TradeInput.defaultProps = {
  className: '',
  placeholder: ''
}

TradeInput.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  payload: PropTypes.shape({
    token: PropTypes.string,
    value: PropTypes.number
  }).isRequired,
  placeholder: PropTypes.string,
  onMaxPress: PropTypes.func.isRequired,
}


export default TradeInput
