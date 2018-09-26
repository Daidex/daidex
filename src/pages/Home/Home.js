import React, { Component } from 'react'

import Row from 'src/components/Atoms/Row'
import Col from 'src/components/Atoms/Col'
import Text from 'src/components/Atoms/Text'
import Button from 'src/components/Atoms/Button'

import logo from 'assets/img/daidex-logo.png'
import desktop from 'assets/img/desktop.png'

import styles from './HomeStyles.sass'

class Home extends Component {
  componentDidMount() {}

  render() {
    return (
      <Row className={styles.container}>
        <Col className={styles.content}>
          <Row spacing={{ bottom: 20 }}>
            <img src={logo} width={180} alt="Daidex logo" />
          </Row>
          <Text theme="h1" className={styles.title}>
            Intercambia ERC-20 Ethereum Tokens desde tu propia wallet
          </Text>
          <Row spacing={{ top: 10, bottom: 10 }}>
            <Text className={styles.description}>
              Daidex, la forma más efectiva, segura y rápida de intercambiar
              tokens ERC-20 en la red de Ethereum sin riesgo alguno y a
              los mejores precios del mercado.
            </Text>
          </Row>
          <Row>
            <Button theme="primary" to="/exchange">
              Ir a Exchange
            </Button>
            <Button theme="primary" to="/how-to-start">
              Cómo Empezar
            </Button>
          </Row>
        </Col>
        <Col className={styles.content} spacing={{ left: 20 }}>
          <img src={desktop} className={styles.desktopImage} alt="daidex website" />
        </Col>
      </Row>
    )
  }
}

export default Home
