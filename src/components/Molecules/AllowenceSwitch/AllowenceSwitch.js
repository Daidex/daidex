import React from 'react'
import PropTypes from 'prop-types'

import Row from 'src/components/Atoms/Row'
import Switch from 'src/components/Atoms/Switch'
import Loader from 'src/components/Atoms/Loader'

const AllowenceSwitch = ({ state, ...rest }) => {
  const loading = state === 'loading'

  return (
    <Row withoutSpacing>
      {loading
        ? <Loader type="default" size="12" />
        : <Switch checked={state} {...rest} />
      }
    </Row>
  )
}

AllowenceSwitch.propTypes = {
  state: PropTypes.oneOf(
    ['loading', true, false]
  ).isRequired
}

export default AllowenceSwitch
