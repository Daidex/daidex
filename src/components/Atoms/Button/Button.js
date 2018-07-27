import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { get } from 'lodash'

import styles from './ButtonStyles.sass'

const Button = ({
  type, theme, className, children, disabled, onClick, ...rest
}) => {
  const classNames = classnames({
    [get(styles, theme, 'default')]: true,
    [styles.disabled]: disabled,
    [className]: !!className,
  })

  return (
    <button
      type={type}
      className={classNames}
      disabled={disabled}
      onClick={!disabled ? onClick : () => {}}
      {...rest}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
}

Button.defaultProps = {
  theme: 'default',
  className: '',
  type: 'button',
  disabled: false,
}

export default Button
