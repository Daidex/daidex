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

const Modal = ({
  children,
  isVisible,
  onCloseModal,
}) => {
  return (
    <ReactModal
      isOpen={isVisible}
      // onAfterOpen={this.afterOpenModal}
      onRequestClose={onCloseModal}
      style={customStyles}
      className={styles.modal}
      overlayClassName={styles.overlay}
      contentLabel="Example Modal"
    >
      {children}
    </ReactModal>
  );
}

Modal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onCloseModal: PropTypes.func.isRequired,
}

export default Modal
