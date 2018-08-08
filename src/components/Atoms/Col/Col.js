import React from 'react'
import PropTypes from 'prop-types'

const Col = ({
  spacing, children, style, ...rest
}) => (
  <div
    style={{
      paddingLeft: `${spacing.left}px`,
      paddingRight: `${spacing.right}px`,
      ...style,
    }}
    {...rest}
  >
    {children}
  </div>
)

Col.defaultProps = {
  spacing: {
    left: 5,
    right: 5,
  },
  style: {}
}

Col.propTypes = {
  spacing: PropTypes.shape({}),
  children: PropTypes.node.isRequired,
  style: PropTypes.shape({}),
}


export default Col
