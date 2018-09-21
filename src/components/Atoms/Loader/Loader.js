import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Row from 'src/components/Atoms/Row'

import styles from './LoaderStyles.sass'

const types = {
  daidex: ({ className, size }) => ( // eslint-disable-line
    <Row className={classnames(styles.container, className)}>
      <div
        className={styles.ldsRing}
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <div />
        <div />
        <div />
        <div />
      </div>
    </Row>
  ),
  default: ({ className }) => ( // eslint-disable-line
    <span className={classnames(styles.loader, className)} />
  )
}

const Loader = ({ type, ...rest }) => {
  const Component = types[type]

  if (!Component) {
    const errorMessage = `component "${type}" does not exist, you mean one of these? ${Object.keys(types)}`
    throw new Error(errorMessage)
  }

  return <Component {...rest} />
}

Loader.propTypes = {
  size: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.oneOf(['daidex', 'default']),
}

Loader.defaultProps = {
  size: '90',
  className: '',
  type: 'daidex'
}

export default Loader
