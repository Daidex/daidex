import React from 'react'
import PropTypes from 'prop-types'
import { omit } from 'lodash'

const Col = ({
  withoutSpacing, spacing, children, style, ...rest
}) => (
  <div
    style={{
      ...omit({
        paddingLeft: `${spacing.left}px`,
        paddingRight: `${spacing.right}px`,
      }, withoutSpacing ? ['paddingRight', 'paddingLeft'] : []),
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
  style: {},
  withoutSpacing: false
}

Col.propTypes = {
  spacing: PropTypes.shape({}),
  children: PropTypes.node.isRequired,
  style: PropTypes.shape({}),
  withoutSpacing: PropTypes.bool,
}


export default Col
