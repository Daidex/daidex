import React from 'react'

import Row from 'src/components/Atoms/Row'
import Link from 'src/components/Atoms/Link'
import Text from 'src/components/Atoms/Text'
import Button from 'src/components/Atoms/Button'

import metaLogo from 'assets/img/meta1.png'

import styles from './MetaMaskWithErrorStyles.sass'
import copies from './copies.json'

const MetaMaskWithError = () => (
  <Row className={styles.container}>
    <Row className={styles.content}>
      <Row className={styles.logo}>
        <img src={metaLogo} alt="MetaMask logo" width={200} />
      </Row>
      <Row className={styles.texts}>
        <Text theme="h1">¡UPS!</Text>
        <Text theme="light-text" className={styles.description}>
          {copies.default}
        </Text>
      </Row>
      <Row spacing={{ top: 60 }}>
        <Button
          theme="primary"
          className={styles.button}
          onClick={() => window.location.reload()}
        >
          Intentar de nuevo
        </Button>
        <Button theme="primary" className={styles.button}>
          <Link href="https://metamask.io/" theme="inline" target="_blank">
            Instalar
          </Link>
        </Button>
      </Row>
    </Row>
  </Row>
)

export default MetaMaskWithError
