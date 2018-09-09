import React, { Component } from 'react'

import Row from 'src/components/Atoms/Row'
import Col from 'src/components/Atoms/Col'
import Text from 'src/components/Atoms/Text'
import Header from 'src/components/Organisms/Header'
import Button from 'src/components/Atoms/Button'

// import logo from 'assets/img/daidex-logo.png'
// import desktop from 'assets/img/desktop.png'

import styles from './HowToStartStyles.sass'

class Home extends Component {
  componentDidMount() {}

  render() {
    return (
      <Row>
        <Header spacing={{ top: 0 }} />
        <Row className={styles.container}>
          <Col className={styles.content} spacing={{ left: 200 }}>
            <Row spacing={{ top: 0, bottom: 50 }}>
              <Text theme="h1" className={styles.title}>
                Cómo Empezar
              </Text>
            </Row>
            <Row spacing={{ top: 10, bottom: 10 }}>

              <Text theme="h2" className={styles.title}>
                Conecta tu Wallet
              </Text>
              <Row spacing={{ top: 10, bottom: 10 }}>
                <Text className={styles.description}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                  et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum.
                </Text>
                <Col spacing={{ left: 25, right: 25 }}>
                  <Text className={styles.helpText}>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur.
                  </Text>
                </Col>
              </Row>
            </Row>
            <Row spacing={{ top: 10, bottom: 10 }}>
              <Text theme="h2" className={styles.title}>
                Wrappea Ether
              </Text>
              <Row spacing={{ top: 10, bottom: 10 }}>
                <Text className={styles.description}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                  et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum.
                </Text>
                <Col spacing={{ left: 25, right: 25 }}>
                  <Text className={styles.helpText}>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur.
                  </Text>
                </Col>
              </Row>
            </Row>
            <Row spacing={{ top: 10, bottom: 10 }}>
              <Text theme="h2" className={styles.title}>
                Desbloquea tus Tokens
              </Text>
              <Row spacing={{ top: 10, bottom: 10 }}>
                <Text className={styles.description}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                  et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum.
                </Text>
                <Col spacing={{ left: 25, right: 25 }}>
                  <Text className={styles.helpText}>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                    dolore eu fugiat nulla pariatur.
                  </Text>
                </Col>
              </Row>
            </Row>
            <Row>
              <Button theme="primary" to="/exchange">
                Ir al Exchange
              </Button>
            </Row>
          </Col>
        </Row>
      </Row>
    )
  }
}

export default Home
