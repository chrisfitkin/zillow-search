import React from 'react';
import AppBar from 'material-ui/AppBar';

const styles = {
  root: {
    marginTop: 0,
    width: '100%',
  },
};

function SimpleAppBar(props) {
  return (
    <div className={styles.root}>
      <AppBar 
        title="Zillow Reader"
        iconStyleLeft={{ display: 'none' }}
      />
    </div>
  );
}

export default (SimpleAppBar);