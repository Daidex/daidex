import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Row from 'src/components/Atoms/Row'
import Link from 'src/components/Atoms/Link'
import Navbar from 'src/components/Molecules/Navbar'

import logo from 'assets/img/daidex-logo.png'

import styles from './HeaderStyles.sass'

const Header = ({ className, ...rest }) => {
  const classNames = classnames({
    [styles.container]: true,
    [className]: !!className
  })

  return (
    <header className={classNames} {...rest}>
      <Row>
        <img src={logo} width={130} alt="Daidex logo" />
      </Row>
      <Row>
        <Navbar>
          <Link to="/" className={styles.link}>
            Exchange
          </Link>
          <Link to="/about" className={styles.link}>
            How it works
          </Link>
          <Link to="/terms-and-conditions" className={styles.link}>
            Terms
          </Link>
          <Link to="/contract" className={styles.link}>
            Contract
          </Link>
        </Navbar>
      </Row>
    </header>
  )
}

Header.defaultProps = {
  className: ''
}

Header.propTypes = {
  className: PropTypes.string,
}

export default Header
