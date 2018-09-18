import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { get, omit } from 'lodash'
import AutosizeInput from 'react-input-autosize'
import classnames from 'classnames'

import styles from './InputStyles.sass'

class Input extends Component {
  isController = false

  constructor(props) {
    super(props)

    this.isController = !!this.props.value
    this.state = {
      value: ''
    }
  }

  onChange = ({ target }) => {
    if (this.isController) {
      this.props.onChange(target.value)
    } else {
      this.setState({ value: target.value }, () => {
        this.props.onChange(target.value)
      })
    }
  }

  render() {
    const {
      theme,
      type,
      label,
      value,
      className,
      autoSize,
      disabled,
      ...rest
    } = this.props

    const Component = autoSize ? AutosizeInput : 'input'

    const classNames = classnames({
      [get(styles, theme, 'default')]: true,
      [className]: !!className,
    })

    return (
      <Component
        className={classNames}
        type={type}
        onChange={this.onChange}
        disabled={disabled}
        value={this.isController ? value : this.state.value}
        {...omit(rest, ['onChange'])}
      />
    )
  }
}

Input.propTypes = {
  theme: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  className: PropTypes.string,
  label: PropTypes.string,
  autoSize: PropTypes.bool,
  disabled: PropTypes.bool,
}

Input.defaultProps = {
  theme: 'default',
  type: 'text',
  onChange: () => {},
  value: undefined,
  className: '',
  label: '',
  autoSize: false,
  disabled: false,
}

export default Input
