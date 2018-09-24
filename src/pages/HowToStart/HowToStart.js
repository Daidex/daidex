import React, { Component } from 'react'

import Row from 'src/components/Atoms/Row'
import Col from 'src/components/Atoms/Col'
import Text from 'src/components/Atoms/Text'
import Header from 'src/components/Organisms/Header'
import Button from 'src/components/Atoms/Button'

// images
import number1 from 'assets/img/n1.png'
import number2 from 'assets/img/n2.png'
import number3 from 'assets/img/n3.png'
import number4 from 'assets/img/n4.png'

import copies from './copies.json'

import styles from './HowToStartStyles.sass'

class Home extends Component {
  componentDidMount() {}

  render() {
    return (
      <Row className={styles.scroll}>
        <Header spacing={{ top: 0 }} />
        <Row className={styles.container}>
          <Col className={styles.content} spacing={{ left: 200 }}>
            <Row spacing={{ top: 0, bottom: 50 }}>
              <Text theme="h1" className={styles.title}>
                Cómo Empezar
              </Text>
            </Row>
            <Row spacing={{ top: 10, bottom: 10 }}>
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={number1}
                  width={70}
                  alt="number 1"
                  style={{
                    marginLeft: '-100px',
                    marginRight: '30px'
                  }}
                />
                <Text theme="h2" className={styles.title}>
                  {copies.step_1.title}
                </Text>
              </Row>
              <Row spacing={{ top: 10, bottom: 10 }}>
                <Text className={styles.description}>
                  {copies.step_1.description}
                </Text>
              </Row>
            </Row>
            <Row spacing={{ top: 10, bottom: 10 }}>
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={number2}
                  width={70}
                  alt="number 2"
                  style={{
                    marginLeft: '-100px',
                    marginRight: '30px'
                  }}
                />
                <Text theme="h2" className={styles.title}>
                  {copies.step_2.title}
                </Text>
              </Row>
              <Row spacing={{ top: 10, bottom: 10 }}>
                <Text className={styles.description}>
                  {copies.step_2.description}
                </Text>
              </Row>
            </Row>
            <Row spacing={{ top: 10, bottom: 10 }}>
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={number3}
                  width={70}
                  alt="number 3"
                  style={{
                    marginLeft: '-100px',
                    marginRight: '30px'
                  }}
                />
                <Text theme="h2" className={styles.title}>
                  {copies.step_3.title}
                </Text>
              </Row>
              <Row spacing={{ top: 10, bottom: 10 }}>
                <Text className={styles.description}>
                  {copies.step_3.description}
                </Text>
              </Row>
            </Row>
            <Row spacing={{ top: 10, bottom: 10 }}>
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={number4}
                  width={70}
                  alt="number 4"
                  style={{
                    marginLeft: '-100px',
                    marginRight: '30px'
                  }}
                />
                <Text theme="h2" className={styles.title}>
                  {copies.step_4.title}
                </Text>
              </Row>
              <Row spacing={{ top: 10, bottom: 10 }}>
                <Text className={styles.description}>
                  {copies.step_4.description}
                </Text>
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
