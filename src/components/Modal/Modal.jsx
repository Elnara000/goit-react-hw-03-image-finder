import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './modal.module.css';

const modalRoot = document.querySelector('#modal-root');
export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      console.log(e.currentTarget);
      console.log(e.target);
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      <div className={css.Overlay} onClick={this.handleBackdropClick}>
        <div className={css.Modal}>
          <img src={this.props.img} alt="searchedImg" width="900" />
        </div>
      </div>,
      modalRoot
    );
  }
}
Modal.propTypes = {
  img: PropTypes.string,
  onClose: PropTypes.func,
};
