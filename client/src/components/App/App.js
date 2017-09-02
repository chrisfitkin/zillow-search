import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import CircularProgress from 'material-ui/CircularProgress';
import AppBar from '../AppBar/AppBar';
import SearchBar from '../SearchBar/SearchBar';
import ZillowData from '../ZillowData/ZillowData';

import './App.css';

// TODO: propTypes

class App extends Component {
  // Initialize state
  state = { 
    content: "Enter your address above to search for information.",
    searchText: "",
    error: false,
    fetching: false
  }
  defaultState = this.state;

  componentDidMount() {
    // this.getZillowData('939 S Pepper St', 'Anaheim, CA, 92802'); // Default data for testing
  }
  
  // API request
  getZillowData = (address, cityStateZip) => {
    this.setState({ fetching: true });
    fetch(`/api/v0/zillow/${address}/${cityStateZip}`)
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
          content: "An error occured processing your request. Please try again.",
          fetching: false
        })
      });
  }

  // Save changes in searh text to state
  onSearchBarChange = (e) => this.setState({ searchText: e.target.value });

  // Trigger an API request when a valid address is selected
  onSearchBarNewRequest = (selectedData, searchedText, selectedDataIndex) => {
    const { address, cityStateZip } = this.parseAddressData(selectedData);
    this.setState({ searchText: selectedData.description });
    this.getZillowData(address, cityStateZip);
  }

  parseAddressData(addressData) {
    return {
      address: addressData.structured_formatting.main_text,
      cityStateZip: addressData.structured_formatting.secondary_text,
    }
  }

  reset() {
    this.setState(this.defaultState);
  }

  render() {
    const { content } = this.state;

    return (
      <div className="App">
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <div>
            <AppBar />
            <div className="content">
              <SearchBar
                searchText={this.state.searchText}
                onChange={this.onSearchBarChange}
                onNewRequest={this.onSearchBarNewRequest}
              />
              { this.state.fetching &&
                <CircularProgress 
                  mode="indeterminate" 
                  style={{ margin: '10px', width: 'auto' }} 
                  size={100} 
                  thickness={5} 
                /> }
              { !this.state.fetching &&
                <ZillowData data={content} reset={this.reset} />
              }
            </div> 
            <div className="footer">
              Powered by Zillow
              <br />
              &copy; Copyright 2017&nbsp;-&nbsp;
              <a 
                href='https://github.com/chrisfitkin' 
                target="_blank"
                rel="noopener noreferrer"
              >@chrisfitkin</a>
            </div>    
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
