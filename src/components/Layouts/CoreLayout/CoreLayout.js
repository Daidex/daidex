import React from 'react'
import PropTypes from 'prop-types'

import styles from './CoreLayoutStyles.sass'

const CoreLayout = ({ children }) => (
  <section className={styles.layout}>
    {children}
  </section>
)

CoreLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default CoreLayout
