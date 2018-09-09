import React from 'react'
import { omit } from 'lodash'
import PropTypes from 'prop-types'

const Row = ({
  withoutSpacing, spacing, children, style, ...rest
}) => (
  <div
    style={{
      flex: 1,
      ...omit({
        paddingTop: `${spacing.top}px`,
        paddingBottom: `${spacing.bottom}px`,
      }, withoutSpacing ? ['paddingTop', 'paddingBottom'] : []),
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
  style: {},
  withoutSpacing: false
}

Row.propTypes = {
  spacing: PropTypes.shape({}),
  children: PropTypes.node.isRequired,
  style: PropTypes.shape({}),
  withoutSpacing: PropTypes.bool
}


export default Row
