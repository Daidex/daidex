import React from 'react'
import PropTypes from 'prop-types'

import Row from 'src/components/Atoms/Row'
import Link from 'src/components/Atoms/Link'
import Navbar from 'src/components/Molecules/Navbar'

import styles from './CoreLayoutStyles.sass'

const CoreLayout = ({ children }) => (
  <section className={styles.layout}>
    <Navbar>
      <Link to="/">
        Home
      </Link>
      <Link to="/exchange">
        Exchange
      </Link>
    </Navbar>
    <Row>
      {children}
    </Row>
  </section>
)

CoreLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default CoreLayout
