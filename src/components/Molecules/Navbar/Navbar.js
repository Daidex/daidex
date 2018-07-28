import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Link from 'src/components/Atoms/Link'

import styles from './NavbarStyles.sass'

const Navbar = ({ className, children, ...rest }) => {
  const classNames = classnames({
    [styles.navbar]: true,
    [className]: !!className
  })
  return (
    <nav className={classNames} {...rest}>
      {children}
    </nav>
  )
}

Navbar.defaultProps = {
  className: ''
}

Navbar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.instanceOf(Link)).isRequired,
}

export default Navbar
