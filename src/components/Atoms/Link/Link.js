import React from 'react';
import PropTypes from 'prop-types'
import { get } from 'lodash'
import classnames from 'classnames'
import { Link as RouteLink } from 'react-router-dom'

import styles from './LinkStyles.sass'

const Link = ({
  href, to, children, className, theme, disabled, ...rest
}) => {
  const classNames = classnames({
    [get(styles, theme, 'default')]: true,
    [styles.disabled]: disabled,
    [className]: !!className,
  })

  return to
    ? (
      <RouteLink
        to={!disabled ? to : null}
        className={classNames}
        {...rest}
      >
        {children}
      </RouteLink>
    ) : (
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
  to: PropTypes.string,
  href: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  theme: PropTypes.string,
  disabled: PropTypes.bool,
}

Link.defaultProps = {
  theme: 'default',
  disabled: false,
  className: '',
  href: '',
  to: '',
}

export default Link;
