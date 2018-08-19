import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import { get } from 'lodash'

import styles from './ButtonStyles.sass'

class Button extends Component {
  renderLink = (classNames) => {
    const {
      children, to,
    } = this.props

    return (
      <Link
        className={classNames}
        to={to}
      >
        {children}
      </Link>
    )
  }

  render() {
    const {
      type, theme, className, children, disabled, onClick, to, ...rest
    } =  this.props

    const classNames = classnames({
      [get(styles, theme, 'default')]: true,
      [styles.disabled]: disabled,
      [className]: !!className,
    })

    return (
      to ? this.renderLink(classNames) : (
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
    )
  }
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  to: PropTypes.string,
}

Button.defaultProps = {
  to: '',
  onClick: () => {},
  theme: 'default',
  className: '',
  type: 'button',
  disabled: false,
}

export default Button
