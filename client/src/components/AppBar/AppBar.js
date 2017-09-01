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
      <AppBar title="Chris App">
      </AppBar>
    </div>
  );
}

export default (SimpleAppBar);