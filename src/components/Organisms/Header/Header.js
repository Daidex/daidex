import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Row from 'src/components/Atoms/Row'
import Navbar from 'src/components/Molecules/Navbar'
import Link from 'src/components/Atoms/Link'

import logo from 'assets/img/daidex-logo.png'
import meta_logo from 'assets/img/meta1.png'

import styles from './HeaderStyles.sass'

const Header = ({
  className,
  address,
  connected,
  ...rest
}) => {
  const classNames = classnames({
    [styles.container]: true,
    [className]: !!className
  })

  return (
    <header className={classNames} {...rest}>
      <Row>
        <img src={logo} width={130} alt="Daidex logo" />
      </Row>
      <Navbar>
        <Link
          theme="inline"
          to="/"
        >
          Inicio
        </Link>
        <Link
          theme="inline"
          to="/exchange"
        >
          Ir a Exchange
        </Link>
        <Link
          theme="inline"
          to="/how-to-start"
        >
          Como empezar
        </Link>
        {
          connected && (
            <Link
              theme="inline"
              to="/how-to-start"
            >
              <img src={meta_logo} alt="logo metamask" />
              <span>
                {
                  `${address.substring(0, 6)}
                  ...
                  ${address.substring(address.length - 4, address.length)}`
                }
              </span>
            </Link>
          )
        }
      </Navbar>
    </header>
  )
}

Header.defaultProps = {
  className: '',
  connected: false,
  address: 'Desconectado',
}

Header.propTypes = {
  className: PropTypes.string,
  connected: PropTypes.bool,
  address: PropTypes.string,
}

export default Header
