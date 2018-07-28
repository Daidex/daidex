import React, { Component } from 'react'

import Row from 'src/components/Atoms/Row'

import styles from './HomeStyles.sass'

class Home extends Component {
  componentDidMount() {}

  render() {
    return (
      <Row className={styles.container}>
        Home!
      </Row>
    )
  }
}

export default Home
