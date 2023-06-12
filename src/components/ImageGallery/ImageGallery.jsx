import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import fetchImages from '../../fetchImages';
import css from './ImageGallery.module.css';
import Loader from 'components/Loader/Loader';
import Button from '../Button/Button';

export default class ImageGallery extends Component {
  state = {
    value: null,
    error: null,
    status: 'idle',
    totalHits: null,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchName !== this.props.searchName) {
      this.setState({ status: 'pending' });

      fetchImages(this.props.searchName, this.props.page)
        .then(value => {
          if (value.hits < 1) {
            return Promise.reject(new Error('No results'));
          }
          return value;
        })
        .then(value =>
          this.setState({
            value: value.hits,
            status: 'resolved',
            totalHits: value.totalHits,
          })
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
    if (prevState.page !== this.state.page) {
      this.setState({ status: 'pending' });
      fetchImages(this.props.searchName, this.state.page)
        .then(value => {
          if (value.hits < 1) {
            return Promise.reject(new Error('No results'));
          }
          return value;
        })
        .then(value => {
          this.setState(prevState => {
            return {
              value: [...prevState.value, ...value.hits],
              status: 'resolved',
              totalHits: value.totalHits,
            };
          });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  loadMore = () => {
    this.setState({ page: this.state.page + 1 });
  };

  render() {
    const { error, value, status } = this.state;

    if (status === 'idle') {
      return <div>Enter a word</div>;
    }
    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return <h1>{error.message}</h1>;
    }
    if (status === 'resolved') {
      return (
        <>
          <ul className={css.imageGallery}>
            {value.map(imgInfo => (
              <ImageGalleryItem
                key={imgInfo.id}
                webImg={imgInfo.webformatURL}
                lgImg={imgInfo.largeImageURL}
              />
            ))}
          </ul>
          {this.state.value.length <= this.state.totalHits && (
            <Button onClick={this.loadMore} />
          )}
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  searchName: PropTypes.string,
  page: PropTypes.number,
};
