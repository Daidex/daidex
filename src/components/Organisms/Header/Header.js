import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Row from 'src/components/Atoms/Row'

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
