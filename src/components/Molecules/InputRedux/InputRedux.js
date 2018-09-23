import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

// import components
import Row from 'src/components/Atoms/Row'
import Input from 'src/components/Atoms/Input'
import Message from 'src/components/Atoms/Message'

import styles from './InputReduxStyles.sass'

const InputRedux = ({
  name,
  type,
  placeholder,
  style,
  className,
  input,
  meta,
  disabled,
  ...rest
}) => {
  const error = !isEmpty(meta) && meta.error && meta.dirty ? meta.error : ''

  return (
    <Row className={styles.container}>
      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        style={{ ...style }}
        className={className}
        onChange={!isEmpty(input) ? input.onChange : () => {}}
        disabled={disabled}
        {...rest}
      />
      <Row>
        <Message type="warning" style={{ opacity: error ? 1 : 0 }}>
          {error}
        </Message>
      </Row>
    </Row>
  )
}

InputRedux.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  style: PropTypes.object,
  className: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
}

InputRedux.defaultProps = {
  style: {},
  className: '',
  name: '',
  type: 'text',
  placeholder: '',
  disabled: false,
  meta: {},
  input: {},
}

export default InputRedux
