import React from 'react'
import PropTypes from 'prop-types'

import Text from 'src/components/Atoms/Text'
import Row from 'src/components/Atoms/Row'

import styles from './MessageStyles.sass'

const Message = ({
  children,
  type,
}) => {
  return (
    <Row spacing={{ top: 0, bottom: 0 }}>
      <Text className={styles[type]}>
        {children}
      </Text>
    </Row>
  )
}

Message.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['warning', 'error', 'success']).isRequired,
}

export default Message
