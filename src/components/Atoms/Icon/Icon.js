import React from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash'
import classnames from 'classnames'

import styles from './IconStyles.sass'

const Icon = ({
  name,
  theme,
  className,
  style,
}) => {
  const classNames = classnames({
    [get(styles, `icon-${name}`)]: true,
    [get(styles, theme, 'default')]: true,
    [className]: !!className,
  })

  return (
    <i
      className={classNames}
      style={style}
    />
  )
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  theme: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.shape({}),
}

Icon.defaultProps = {
  theme: 'default',
  className: '',
  style: {}
}

export default Icon
