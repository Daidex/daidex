import React from 'react'
import PropTypes from 'prop-types'

// import components
import Row from 'src/components/Atoms/Row'
import Input from 'src/components/Atoms/Input'

const InputRedux = ({
  name,
  type,
  placeholder,
  style,
  className,
  input,
  disabled,
  ...rest
}) => {
  return (
    <Row style={{ display: 'flex' }}>
      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        style={{ ...style }}
        className={className}
        onChange={input ? input.onChange : () => {}}
        disabled={disabled}
        {...rest}
      />
    </Row>
  )
}

InputRedux.propTypes = {
  input: PropTypes.object.isRequired,
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
}

export default InputRedux
