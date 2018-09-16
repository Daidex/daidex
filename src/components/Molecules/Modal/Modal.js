import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types'

import styles from './Modal.sass'

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

ReactModal.setAppElement('#root')

class Modal extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  constructor() {
    super();

    this.state = {
      modalIsOpen: true
    };

    this.openModal = this.openModal.bind(this);
    // this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  // afterOpenModal() {}

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <ReactModal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={customStyles}
        className={styles.modal}
        overlayClassName={styles.overlay}
        contentLabel="Example Modal"
      >
        {this.props.children}
      </ReactModal>
    );
  }
}

export default Modal
