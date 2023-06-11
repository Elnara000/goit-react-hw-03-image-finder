import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import fetchImages from '../../fetchImages';
import css from './ImageGallery.module.css';
import Loader from 'components/Loader/Loader';
// import Button from '../Button/Button';

export default class ImageGallery extends Component {
  state = {
    value: null,
    error: null,
    status: 'idle',
    // page: 1,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchName !== this.props.searchName) {
      this.setState({ status: 'pending' });

      fetchImages(this.props.searchName, this.props.page)
        .then(value => this.setState({ value: value.hits, status: 'resolved' }))
        .catch(error => this.setState({ error, status: 'rejected' }))
        .finally(() => this.setState({ loading: false }));
    }
    if (prevProps.page !== this.props.page) {
      fetchImages(this.props.searchName, this.props.page)
        .then(value =>
          this.setState({
            value: [...prevState.value, ...value.hits],
            status: 'resolved',
          })
        )
        .catch(error => this.setState({ error, status: 'rejected' }))
        .finally(() => this.setState({ loading: false }));
    }
  }
  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.searchName !== this.props.searchName) {
  //     this.setState({ status: 'pending' });

  //     fetchImages(this.props.searchName, this.state.page)
  //       .then(value => this.setState({ value: value.hits, status: 'resolved' }))
  //       .catch(error => this.setState({ error, status: 'rejected' }))
  //       .finally(() => this.setState({ loading: false }));
  //   }
  //   if (prevState.page !== this.state.page) {
  //     // console.log(prevState.page);
  //     // console.log(this.state.page);
  //     fetchImages(this.props.searchName, this.state.page)
  //       .then(value =>
  //         this.setState({
  //           value: [...prevState.value, ...value.hits],
  //           status: 'resolved',
  //         })
  //       )
  //       .catch(error => this.setState({ error, status: 'rejected' }))
  //       .finally(() => this.setState({ loading: false }));
  //   }
  //
  // }

  // loadMore = e => {
  //   this.setState({ page: (this.state.page += 1) });
  // };

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
          {/* <Button onClick={this.loadMore} /> */}
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  searchName: PropTypes.string,
  page: PropTypes.number,
};
