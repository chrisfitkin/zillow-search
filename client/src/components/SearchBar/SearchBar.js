import React from 'react';

// import GooglePlaceAutocomplete from 'material-ui-places';
import GooglePlaceAutocomplete from '../GooglePlacesAutocomplete/GooglePlacesAutocomplete';


const SearchBar = (props) => {

  const { searchText, onChange, onNewRequest } = props;

  return (
    <GooglePlaceAutocomplete
      name="location"
      floatingLabelText="Your Address"
      hintText="939 S Pepper St, Anaheim CA"
      searchText={searchText}
      onChange={onChange}
      onNewRequest={onNewRequest}
      fullWidth={true}
    />
  );
};

export default SearchBar;