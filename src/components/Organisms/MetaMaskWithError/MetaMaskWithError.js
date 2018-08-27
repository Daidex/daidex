import React from 'react'
import PropTypes from 'prop-types'

import Row from 'src/components/Atoms/Row'
import Link from 'src/components/Atoms/Link'
import Text from 'src/components/Atoms/Text'
import Button from 'src/components/Atoms/Button'

import appStates from 'src/store/states/appStates'
import metaLogo from 'assets/img/meta1.png'

import styles from './MetaMaskWithErrorStyles.sass'
import copies from './copies.json'

const copyByView = {
  [appStates.view.metaMaskIsRequired]: copies.install_meta_mask,
  [appStates.view.metaMaskFailToConnect]: copies.unclock_meta_mask,
  [appStates.view.metaMaskIsNotMainNet]: copies.network_not_allowed
}

const MetaMaskWithError = ({ view }) => (
  <Row className={styles.container}>
    <Row className={styles.content}>
      <Row className={styles.logo}>
        <img src={metaLogo} alt="MetaMask logo" width={200} />
      </Row>
      <Row className={styles.texts}>
        <Text theme="h1">¡UPS!</Text>
        <Text theme="light-text" className={styles.description}>
          {copyByView[view] || copies.default}
        </Text>
      </Row>
      <Row spacing={{ top: 60 }} className={styles.actions}>
        <Button
          theme="primary"
          className={styles.button}
          onClick={() => window.location.reload()}
        >
          Intentar de nuevo
        </Button>
        {view === appStates.view.metaMaskIsRequired && (
          <Button theme="primary" className={styles.button}>
            <Link href="https://metamask.io/" theme="inline" target="_blank">
              Instalar
            </Link>
          </Button>
        )}
      </Row>
    </Row>
  </Row>
)

MetaMaskWithError.propTypes = {
  view: PropTypes.string.isRequired
}

export default MetaMaskWithError
