import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import css from './App.module.css';

class App extends Component {
  state = {
    searchName: '',
    pageNumber: 1,
    didntUpdateForBtn: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchName !== this.state.searchName) {
      this.setState({ didntUpdateForBtn: true });
      console.log(5);
    }
    // if (prevState.searchName !== this.state.searchName) {
    //   this.setState({ didUpdateForBtn: false });
    // }
  }

  handleSearchFormSubmit = searchName => {
    this.setState({ searchName });
  };

  loadMore = e => {
    this.setState({ pageNumber: (this.state.pageNumber += 1) });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleSearchFormSubmit} />
        <ImageGallery
          searchName={this.state.searchName}
          page={this.state.pageNumber}
        />
        {this.state.didntUpdateForBtn && <Button onClick={this.loadMore} />}
      </div>
    );
  }
}

export default App;
