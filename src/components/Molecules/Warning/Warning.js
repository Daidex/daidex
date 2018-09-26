import React from 'react'
import PropTypes from 'prop-types'

import Text from 'src/components/Atoms/Text'
import Link from 'src/components/Atoms/Link'
import Button from 'src/components/Atoms/Button'
import Row from 'src/components/Atoms/Row'

import styles from './WarningStyles.sass'
import copies from './copies.json'

const etherscanURL = (hash, netId) => {
  switch (netId) {
    case 1:
      return `https://etherscan.io/tx/${hash}`
    case 42:
      return `https://kovan.etherscan.io/tx/${hash}`
    default:
      return `https://etherscan.io/tx/${hash}`
  }
}

const showError = (error) => {
  return copies[error] ? copies[error] : error
}

const Warning = ({
  type,
  title,
  payload,
  onClose,
}) => {
  return type === 'success' ? (
    <Row className={styles.container}>
      <Row>
        <Text theme="h2">{title}</Text>
      </Row>
      <Row>
        <Text theme="h3" style={{ color: 'white' }}>Cantidad Recibida:</Text>
        <Text style={{ color: 'white' }}>
          {`${payload.amountToReceive} ${payload.symbolToReceive}`}
        </Text>
      </Row>
      <Row>
        <Text theme="h3" style={{ color: 'white' }}>Cantidad Pagada:</Text>
        <Text style={{ color: 'white' }}>
          {`${payload.amountToPaid} ${payload.symbolToPaid}`}
        </Text>
      </Row>
      <Row>
        <Text theme="h3" style={{ color: 'white' }}>
          Ver Detalles de la Transacción:
        </Text>
        <Link
          href={etherscanURL.call(null, payload.fillTxHash, payload.netId)}
          target="blank"
          style={{ color: 'orange' }}
        >
          Etherscan
        </Link>
      </Row>
      <Row>
        <Button theme="primary" onClick={onClose}>OK</Button>
      </Row>
    </Row>
  ) : (
    <Row className={styles.container}>
      <Row>
        <Text theme="h2">{title}</Text>
      </Row>
      <Row>
        <Text theme="h3" style={{ color: 'white' }}>Transacción no Realizada</Text>
      </Row>
      <Row>
        <Text theme="h3" style={{ color: 'white' }}>Descripcion:</Text>
        <Text style={{ color: 'red' }}>
          {
            showError(payload.error)
          }
        </Text>
      </Row>
      <Row>
        <Button theme="primary" onClick={onClose}>OK</Button>
      </Row>
    </Row>
  )
}

Warning.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  payload: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Warning
