import React from 'react';
import propTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import ZillowLinks from '../ZillowLinks/ZillowLinks';
import ZillowAddress from '../ZillowAddress/ZillowAddress';
import ZillowLocalRealEstate from '../ZillowLocalRealEstate/ZillowLocalRealEstate';
import ZillowZestimate from '../ZillowZestimate/ZillowZestimate';
import ZillowZpid from '../ZillowZpid/ZillowZpid';

const style = {
  wrapper: {
    textAlign: 'left',
    maxWidth: '100%',
  },
  card: {
    margin: '10px'
  },
  label: {
    textTransform: 'capitalize'
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

  return (
    <div style={style.wrapper}>
      <ZillowZestimate data={zestimate[0]} />
      <ZillowLinks links={links[0]} />
      <ZillowAddress data={address[0]} />
      <ZillowLocalRealEstate data={localRealEstate[0]} />
      <ZillowZpid zpid={zpid[0]} />
    </div>
  );
  // TODO: reset button
}

ZillowData.propTypes = {
  data: propTypes.oneOfType([
    propTypes.string,
    propTypes.object
    // propTypes.shape({
    //   zpid: propTypes.object,
    //   links: propTypes.object,
    //   address: propTypes.object,
    //   zestimate: propTypes.object,
    //   localRealEstate: propTypes.object
    // })
  ]),  
  reset: propTypes.func
}

export default ZillowData;
