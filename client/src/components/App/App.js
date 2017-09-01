import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import AppBar from '../AppBar/AppBar';
import SearchBar from '../SearchBar/SearchBar';

import './App.css';

class App extends Component {
  // Initialize state
  state = { 
    content: "Enter your address above to search for information.",
    searchText: "",
  }

  // Fetch passwords after first mount
  componentDidMount() {
    // this.getContent();
  }

  getContent = (address) => {
    // Get the contents and store them in state
    fetch(`/api/chris/${address}`)
      .then(res => res.json())
      .then(data => {
        console.log('content', data);
        this.setState({ content: data })
      })
      .catch(e => {
        console.log('error', e);
        this.setState({ content: "An error occured processing your request." })
      });
  }

  onSearchBarChange = (e) => {
    this.setState({
      searchText: e.target.value
    });
    console.log("onSearchBarChange", e.target.value);
  }

  onSearchBarNewRequest = (selectedData, searchedText, selectedDataIndex) => {
    this.setState({
      searchText: selectedData.description
    });
    console.log("onSearchBarNewRequest", selectedData);
  }

  render() {
    const { content } = this.state;

    return (
      <div className="App">
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          {/* Render the passwords if we have them */}
          {content.length ? (
            <div>
              <AppBar />
              <SearchBar
                searchText={this.state.searchText}
                onChange={this.onSearchBarChange}
                onNewRequest={this.onSearchBarNewRequest}
              />
              <ul className="content">
                {content}
              </ul>     
            </div>
          ) : (
            // Render a helpful message otherwise
            <div>
              <h1>No content :(</h1>
              <button
                className="more"
                onClick={this.getContent}>
                Try Again?
              </button>
            </div>
          )}
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
