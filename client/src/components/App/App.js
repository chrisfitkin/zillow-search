import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from '../AppBar/AppBar';
import SearchBar from '../SearchBar/SearchBar';
import LinearProgress from 'material-ui/LinearProgress';

import './App.css';

// TODO: propTypes

class App extends Component {
  // Initialize state
  state = { 
    content: "",
    searchText: "",
    error: false,
    fetching: false
  }

  // Fetch passwords after first mount
  componentDidMount() {
    // this.getContent();
  }

  // API request
  getContent = (address) => {
    this.setState({ fetching: true });
    fetch(`/api/chris/${address}`)
      .then(res => res.json())
      .then(data => {
        // Save the response to state
        this.setState({ 
          content: data,
          fetching: false
        })
      })
      .catch(e => {
        console.log('error', e);
        this.setState({ 
          content: "An error occured processing your request.",
          fetching: false
        })
      });
  }

  // Save changes in searh text to state
  onSearchBarChange = (e) => this.setState({ searchText: e.target.value });

  // Trigger an API request when a valid address is selected
  onSearchBarNewRequest = (selectedData, searchedText, selectedDataIndex) => {
    this.setState({ searchText: selectedData.description });
    this.getContent(selectedData.description);
  }

  render() {
    const { content } = this.state;

    return (
      <div className="App">
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <div>
            <AppBar />
            <SearchBar
              searchText={this.state.searchText}
              onChange={this.onSearchBarChange}
              onNewRequest={this.onSearchBarNewRequest}
            />
            { this.state.fetching && 
              <LinearProgress 
                mode="indeterminate" 
                style={{ margin: '10px', width: 'auto' }} 
              /> }
            <div className="content">
              {content.length ?
                content :
                "Enter your address above to search for information."}
            </div>     
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
