import React from 'react';
import propTypes from 'prop-types';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


const style = {
  wrapper: {
    textAlign: 'left',
    maxWidth: '100%',
  },
  card: {
    marginBottom: '20px'
  },
  json: {
    width: 'auto',
    maxWidth: '100%',
    overflowX: 'hidden'
  }
}

const ZillowData = (props) => {
  const { data } = props;
  // test for single string
  if (typeof data === 'string') {
    return (<span>{data}</span>)
  }

  // Destructure API data
  const { zpid, links, address, zestimate, localRealEstate } = data;

  const linksMap = {
    'homedetails': 'Home Details',
    'graphsanddata': 'Graphs and Data',
    'mapthishome': 'Map This Home',
    'comparables': 'Comparables'
  }
  console.log('links', links[0]);

  return (
    <div style={style.wrapper}>
      { links[0] &&
        <Card style={style.card}>
          <CardHeader title="Links" />
          <CardText>
            {Object.entries(links[0]).map((pair) => {
              const key = pair[0];
              const value = pair[1];
              return( <FlatButton
                key={key}
                href={value[0]}
                target="_blank"
                label={linksMap[key] || key}
                />)})}
          </CardText>
        </Card> }

      {/* ZPID */}
      <Card style={style.card}>
        <CardHeader title="ZPID" />
        <CardText>{zpid[0]}</CardText>
      </Card>


      {/* Raw Data */}
      <div style={style.json}>
        <pre>{JSON.stringify(data, null, 4)}</pre>
      </div>
    </div>
  );
  // TODO: reset button
}

ZillowData.propTypes = {
  data: propTypes.oneOfType([
    propTypes.string,
    propTypes.object
  ]),  
  reset: propTypes.func
}

export default ZillowData;
