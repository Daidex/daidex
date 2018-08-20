import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Row from 'src/components/Atoms/Row'

class MetaMaskWithError extends Component {
  static propTypes = {
    view: PropTypes.string.isRequired,
    previousView: PropTypes.string.isRequired,
  }

  componentDidMount() {}

  render() {
    const { view, previousView } = this.props

    return (
      <Row>
        <h1>MetaMaskWithError</h1>
        <h1>view: {view}</h1>
        <h1>previousView: {previousView}</h1>
      </Row>
    )
  }
}

export default MetaMaskWithError
