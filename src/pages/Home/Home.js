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
            Trade ERC20 tokens using your own wallet
          </Text>
          <Row spacing={{ top: 10, bottom: 10 }}>
            <Text className={styles.description}>
              Simple, fast and realiable solution to trade ERC-20 tokenscross entire Etherium network without risk.
            </Text>
          </Row>
          <Row>
            <Button theme="primary" onClick={() => {}}>
              TAKE ME IN
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
