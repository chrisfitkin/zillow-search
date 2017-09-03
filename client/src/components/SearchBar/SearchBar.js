import React from 'react';
import propTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import GooglePlaceAutocomplete from 'material-ui-places';

const style = {
  button: {
    margin: '10px'
  }
};

const SearchBar = (props) => {

  const { searchText, onChange, onNewRequest, reset } = props;
  const location = { lat: 33.8366, lng: 117.9143}; // Anaheim, CA
  const restrictions = { country: ['us'] };

  return (
    <div>
      <GooglePlaceAutocomplete
        name="location"
        floatingLabelText="Your Address"
        hintText="939 S Pepper St, Anaheim CA"
        searchText={searchText}
        onChange={onChange}
        onNewRequest={onNewRequest}
        fullWidth={true}
        location={location}
        restrictions={restrictions}
      />
      <RaisedButton label="Search" 
        primary={true} 
        style={style.button} 
        onClick={() => onNewRequest()}
      />
      <FlatButton label="Reset" 
        primary={false} 
        style={style.button} 
        onClick={reset}
      />
    </div>
  );
};

SearchBar.propTypes = {
  searchText: propTypes.string,
  onChange: propTypes.func,
  onNewRequest: propTypes.func,
  reset: propTypes.func
};

export default SearchBar;