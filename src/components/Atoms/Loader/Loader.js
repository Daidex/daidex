import React from 'react'
import PropTypes from 'prop-types'

import Row from 'src/components/Atoms/Row'

import styles from './LoaderStyles.sass'

const Loader = ({ size }) => {
  return (
    <Row className={styles.container}>
      <div className={styles.ldsRing} style={{ width: `${size}px`, height: `${size}px` }}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </Row>
  )
}

Loader.propTypes = {
  size: PropTypes.string,
}

Loader.defaultProps = {
  size: '90'
}

export default Loader
