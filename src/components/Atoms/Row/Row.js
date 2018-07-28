import React from 'react'
import PropTypes from 'prop-types'

const Row = ({
  spacing, children, style, ...rest
}) => (
  <div
    style={{
      paddingTop: spacing.top,
      paddingBottom: spacing.bottom,
      ...style,
    }}
    {...rest}
  >
    {children}
  </div>
)

Row.defaultProps = {
  spacing: {
    top: 5,
    bottom: 5,
  },
  style: {}
}

Row.propTypes = {
  spacing: PropTypes.shape({}),
  children: PropTypes.node.isRequired,
  style: PropTypes.shape({}),
}


export default Row
