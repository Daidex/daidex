import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Row from 'src/components/Atoms/Row'
import Switch from 'react-switch'

import styles from './SwitchStyles.sass'

class SwitchComp extends Component {
  static propTypes = {
    checked: PropTypes.bool,
    isController: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isController: false,
    checked: false
  }

  state = {
    checked: false
  }

  handleChange = (checked) => {
    if (this.props.isController) {
      this.props.onChange(checked)
    } else {
      this.setState({ checked }, () => {
        this.props.onChange(checked)
      })
    }
  }

  render() {
    const { checked, isController } = this.props
    return (
      <Row className={styles.container} withoutSpacing>
        <Switch
          onChange={this.handleChange}
          checked={isController ? checked : this.state.checked}
          uncheckedIcon={false}
          checkedIcon={false}
          className="react-switch"
          id="normal-switch"
        />
      </Row>
    )
  }
}

export default SwitchComp
