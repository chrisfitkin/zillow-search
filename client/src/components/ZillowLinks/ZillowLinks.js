import React from 'react';
import propTypes from 'prop-types';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const style = {
  card: {
    margin: '10px'
  }
}

const ZillowLinks = (props) => {
  const { links } = props;
  // Translate keys for display labels
  const labels = {
    'homedetails': 'Home Details',
    'graphsanddata': 'Graphs and Data',
    'mapthishome': 'Map This Home',
    'comparables': 'Comparables'
  };
  return links ? (
    <div>
      <Card style={style.card}>
        <CardHeader title="Links" />
        <CardText>Find out more about this property.</CardText>
        <CardActions>
          {Object.entries(links).map((pair) => { // Loop through links
            const key = pair[0];
            const value = pair[1];
            return( <FlatButton
              key={key}
              href={value[0]}
              target="_blank"
              primary={key==='homedetails'}
              label={labels[key] || key}
              />);
            })}
        </CardActions>
      </Card>
    </div>
  ) : false;
}

ZillowLinks.propTypes = {
  links: propTypes.object
}

export default ZillowLinks;
