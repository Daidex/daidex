import React from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash'
import classnames from 'classnames'

import styles from './InputStyles.sass'

const Input = ({
  theme,
  type,
  onChange,
  label,
  value,
  className,
  ...rest
}) => {
  const classNames = classnames({
    [get(styles, theme, 'default')]: true,
    [className]: !!className,
  })

  return (
    <input
      className={classNames}
      type={type}
      onChange={onChange}
      value={value}
      {...rest}
    />
  )
}

Input.propTypes = {
  theme: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string
}

Input.defaultProps = {
  theme: 'default',
  type: 'text',
  onChange: () => {},
  value: undefined,
  className: '',
  label: ''
}

export default Input
