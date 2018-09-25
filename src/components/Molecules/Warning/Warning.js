import React from 'react'
import PropTypes from 'prop-types'

import Text from 'src/components/Atoms/Text'
import Link from 'src/components/Atoms/Link'
import Button from 'src/components/Atoms/Button'
import Row from 'src/components/Atoms/Row'

import styles from './WarningStyles.sass'

const Warning = ({
  type,
  title,
}) => {
  return type === 'success' ? (
    <Row className={styles.container}>
      <Row>
        <Text theme="h2">{title}</Text>
      </Row>
      <Row>
        <Text theme="h3" style={{ color: 'white' }}>Cantidad Recibida:</Text>
        <Text style={{ color: 'white' }}>0.001 ZRX</Text>
      </Row>
      <Row>
        <Text theme="h3" style={{ color: 'white' }}>Cantidad Pagada:</Text>
        <Text style={{ color: 'white' }}>0.0001 WETH</Text>
      </Row>
      <Row>
        <Text theme="h3" style={{ color: 'white' }}>Ver Detalles de la Transacción:</Text>
        <Link
          href="https://coinbtr.com/"
          target="blank"
          style={{ color: 'orange' }}
        >
          Etherscan
        </Link>
      </Row>
      <Row>
        <Button theme="primary">
          OK
        </Button>
      </Row>
    </Row>
  ) : (
    <Row className={styles.container}>
      <Row>
        <Text theme="h2">Error en la Transacción</Text>
      </Row>
      <Row>
        <Text theme="h3" style={{ color: 'white' }}>Transacción no Realizada</Text>
      </Row>
      <Row>
        <Text theme="h3" style={{ color: 'white' }}>Descripcion:</Text>
        <Text style={{ color: 'red' }}>
          BATCH_ORDERS_MUST_HAVE_AT_LEAST_ONE_ITEM
        </Text>
      </Row>
      <Row>
        <Button theme="primary">OK</Button>
      </Row>
    </Row>
  )
}

Warning.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default Warning
