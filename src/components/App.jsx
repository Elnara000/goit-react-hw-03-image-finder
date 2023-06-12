import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import css from './App.module.css';

class App extends Component {
  state = {
    searchName: '',
  };

  handleSearchFormSubmit = searchName => {
    this.setState({ searchName });
  };

  render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSearchFormSubmit} />
        <ImageGallery searchName={this.state.searchName} />
      </div>
    );
  }
}

export default App;
