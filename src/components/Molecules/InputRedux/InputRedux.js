import React from 'react'
import PropTypes from 'prop-types'

// import components
import Row from 'src/components/Atoms/Row'
import Input from 'src/components/Atoms/Input'

const InputRedux = (props) => {
  return (
    <Row style={{ display: 'flex' }}>
      <Input
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        style={{ ...props.style }}
        className={props.className}
        onChange={props.input.onChange}
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
  placeholder: PropTypes.string
}

InputRedux.defaultProps = {
  style: {},
  className: '',
  name: '',
  type: 'text',
  placeholder: ''
}

export default InputRedux
