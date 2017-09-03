import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import CircularProgress from 'material-ui/CircularProgress';
import AppBar from '../AppBar/AppBar';
import SearchBar from '../SearchBar/SearchBar';
import ZillowData from '../ZillowData/ZillowData';
import addressParser from 'parse-address';

import './App.css';

const customTheme = {
  palette: {
    primary1Color: '#0074e4'
  }
};

class App extends Component {
  // Initialize state
  state = { 
    content: "Enter your address above to search for information.",
    searchText: "",
    error: false,
    fetching: false
  }
  defaultState = this.state;
  
  // API request
  getZillowData = (address, cityStateZip) => {
    this.setState({ 
      ...this.state, 
      content: '', 
      error: false,
      fetching: true 
    });
    fetch(`/api/v0/zillow/${address}/${cityStateZip}`)
      .then(res => res.json())
      .then(data => {
        // Save the response to state
        this.setState({
          ...this.state, 
          error: !!data.error,
          content: !data.error ? data : data.error,
          fetching: false,
        })
      })
      .catch(e => {
        console.log('error', e || 'Unknown error');
        this.setState({ 
          ...this.state,
          content: "An error occured processing your request. Please try again. (hint: Try including address, city, state, and zip code.)",
          fetching: false
        })
      });
  }

  componentDidMount() {
    // this.getZillowData("939 S Pepper St", "Anaheim, CA");  // Sample data
  }

  // Save changes in searh text to state
  onSearchBarChange = (e) => this.setState({ searchText: e.target.value || '' });

  // Trigger an API request when a valid address is selected
  onSearchBarNewRequest = (selectedData, searchedText, selectedDataIndex) => {
    const { address, cityStateZip } = this.parseAddressData(selectedData);
    this.setState({ searchText: selectedData ? selectedData.description : this.searchText });
    this.getZillowData(address, cityStateZip);
  }

  parseAddressData(addressData) {
    // Test for complete address data from Google Places API,
    // otherwise attempt to parse
    let parsed = {};
    if (addressData) {
      parsed = {
        address: addressData.structured_formatting.main_text,
        cityStateZip: addressData.structured_formatting.secondary_text,
      };
    } else {
      const parts = addressParser.parseLocation(this.state.searchText);
      const line1 = ['number', 'prefix', 'street', 'type'];
      parsed = parts ? {
        address: Object.keys(parts).reduce((address, key) => 
          line1.includes(key) ? `${address} ${parts[key]}` : address, '').trim(),
        cityStateZip: Object.keys(parts).reduce((cityStateZip, key) => 
          !line1.includes(key) ? `${cityStateZip}, ${parts[key]}` : cityStateZip, '').substring(2),
      } : { address: null, cityStateZip: null };
    }
    return parsed;
  }

  reset() {
    this.setState({ ...this.defaultState});
  }

  render() {
    const { content } = this.state;

    return (
      <div className="App">
        <MuiThemeProvider muiTheme={getMuiTheme(customTheme)}>
          <div>
            <AppBar />
            <div className="content">
              <SearchBar
                searchText={this.state.searchText}
                onChange={this.onSearchBarChange}
                onNewRequest={this.onSearchBarNewRequest}
                reset={() => this.reset()}
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
