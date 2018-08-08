import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { get } from 'lodash'
import styles from './TextStyles.sass'

const Text = ({
  component: Component, theme, className, children, ...rest
}) => {
  const classNames = classnames({
    [get(styles, theme, 'default')]: true,
    [className]: !!className,
  })

  return (
    <Component className={classNames} {...rest}>
      {children}
    </Component>
  )
}

Text.propTypes = {
  component: PropTypes.string,
  theme: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

Text.defaultProps = {
  className: '',
  theme: 'default',
  component: 'p',
}


export default Text
