import React from 'react';
import PropTypes from 'prop-types'
import { get } from 'lodash'
import classnames from 'classnames'

import styles from './LinkStyles.sass'

const Link = ({
  href, children, className, theme, disabled, ...rest
}) => {
  const classNames = classnames({
    [get(styles, theme, 'default')]: true,
    [styles.disabled]: disabled,
    [className]: className,
  })

  return (
    <a
      href={!disabled ? href : null}
      className={classNames}
      {...rest}
    >
      {children}
    </a>
  )
}

Link.propTypes = {
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  theme: PropTypes.string,
  disabled: PropTypes.bool,
}

Link.defaultProps = {
  theme: 'default',
  disabled: false,
  className: ''
}

export default Link;
