import React from 'react';

import GooglePlaceAutocomplete from 'material-ui-places';

const SearchBar = (props) => {

  const { searchText, onChange, onNewRequest } = props;
  const location = { lat: 33.8366, lng: 117.9143}; // Anaheim, CA
  const restrictions = { country: ['us'] };

  return (
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
  );
};

export default SearchBar;