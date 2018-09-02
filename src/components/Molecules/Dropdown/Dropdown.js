import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { get } from 'lodash'

import Row from 'src/components/Atoms/Row'
import Icon from 'src/components/Atoms/Icon'
import Link from 'src/components/Atoms/Link'

import styles from './DropdownStyles.sass'

class Dropdown extends Component {
  static propTypes = {
    initialSelected: PropTypes.number,
    template: PropTypes.node,
    source: PropTypes.array.isRequired,
    label: PropTypes.string,
    theme: PropTypes.string,
    onChange: PropTypes.func,
    className: PropTypes.string,
    closeAfterSelected: PropTypes.bool,
  }

  static defaultProps = {
    initialSelected: -1,
    className: '',
    theme: 'default',
    template: null,
    label: '',
    onChange: () => {},
    closeAfterSelected: true,
  }

  state = {
    open: false,
    changed: false,
    selected: this.props.initialSelected >= 0
      ? this.props.source[this.props.initialSelected]
      : {},
  }

  componentDidMount() {}

  open = () => {
    if (!this.state.open) this.setState({ open: true })
  }

  close = () => {
    if (this.state.open) this.setState({ open: false })
  }

  handleBlur = () => {
    if (this.state.open) this.close()
  }

  handleClick = (event) => {
    event.preventDefault()

    if (this.state.open) this.close()
    else this.open()
  }

  handleSelect = (item) => {
    if (!item.disabled) {
      this.setState({ selected: item, changed: true }, () => {
        if (this.props.onChange) this.props.onChange(item)
        if (this.props.closeAfterSelected) this.close()
      })
    }
  }

  showLabel = () => {
    const { changed, selected } = this.state
    const { label, initialSelected } = this.props

    return changed || initialSelected >= 0 ? selected.label : label
  }

  renderValue = (item) => {
    const isSelected = item.value === this.state.selected.value
    const classNames = classnames(styles.item, {
      [styles.active]: isSelected,
      [styles.disabled]: item.disabled,
    })

    return (
      <li
        key={item.value}
        className={classNames}
        role="option"
        aria-selected={isSelected}
        onClick={() => this.handleSelect(item)}
        onKeyDown={() => null}
      >
        {this.props.template ? this.props.template(item) : item.label}
      </li>
    )
  }

  render() {
    const {
      theme, className, source, template, ...rest
    } = this.props

    const classNames = classnames({
      [get(styles, theme, 'default')]: true,
      [styles.open]: this.state.open,
      [className]: !!className,
    })

    return (
      <Row
        className={classNames}
        role="combobox"
        aria-controls="listbox"
        aria-expanded={this.state.open}
        tabIndex="0"
        {...rest}
        // onBlur={this.handleBlur}
      >
        <Row className={styles.selected}>
          <Link
            theme="dropdown"
            onClick={this.handleClick}
          >
            {!template ? this.showLabel() : template(this.state.selected)}
            <Icon name="arrow-down" theme="token" />
          </Link>
          <ul
            id="listbox"
            role="listbox"
            className={styles.list}
          >
            {source.map(this.renderValue)}
          </ul>
        </Row>
      </Row>
    )
  }
}

export default Dropdown
