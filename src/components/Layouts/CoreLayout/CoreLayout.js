import React from 'react'
import PropTypes from 'prop-types'

import Row from 'src/components/Atoms/Row'
import Header from 'src/components/Organisms/Header'

import styles from './CoreLayoutStyles.sass'

const CoreLayout = ({ children }) => (
  <section className={styles.layout}>
    <Header />
    <Row>
      {children}
    </Row>
  </section>
)

CoreLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default CoreLayout
