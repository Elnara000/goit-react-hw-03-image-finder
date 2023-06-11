import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Modal from '../Modal/Modal';
import css from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  openModal = e => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };
  toggleModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <>
        <li className={css.ImageGalleryItem} onClick={this.openModal}>
          <img src={this.props.webImg} alt="searchedImg" />
        </li>
        {this.state.showModal && (
          <Modal img={this.props.lgImg} onClose={this.toggleModal} />
        )}
      </>
    );
  }
}
//width img
ImageGalleryItem.propTypes = {
  webImg: PropTypes.string,
  lgImg: PropTypes.string,
};
