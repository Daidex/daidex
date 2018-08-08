import React from 'react'
import PropTypes from 'prop-types'

import Row from 'src/components/Atoms/Row'

import styles from './CoreLayoutStyles.sass'

const CoreLayout = ({ children }) => (
  <section className={styles.layout}>
    <Row className={styles.children} spacing={{ bottom: 0, top: 0 }}>
      {children}
    </Row>
  </section>
)

CoreLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default CoreLayout
