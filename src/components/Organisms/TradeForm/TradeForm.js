import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Row from 'src/components/Atoms/Row'
import TradeInput from 'src/components/Molecules/TradeInput'

class TradeForm extends Component {
  static propTypes = {
    maxValue: PropTypes.number
  }

  static defaultProps = {
    maxValue: 300
  }

  state = {
    value: 100,
  }

  componentDidMount() {}

  handleOnChange = (value) => {
    this.setState({ value: Number(value) })
  }

  handleOnMaxPress = () => {
    this.setState({ value: this.props.maxValue })
  }

  render() {
    return (
      <Row>
        <TradeInput
          onMaxPress={this.handleOnMaxPress}
          onChange={this.handleOnChange}
          payload={{
            token: 'WETH',
            value: this.state.value
          }}
          autoSize
        />
      </Row>
    )
  }
}

export default TradeForm
