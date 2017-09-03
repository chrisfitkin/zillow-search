import React from 'react';
import propTypes from 'prop-types';
import { Card, CardHeader, CardText } from 'material-ui/Card';

const style = {
  card: {
    margin: '20px 10px'
  }
}

const ZillowZpid = (props) => {
  const { zpid } = props;

  return zpid && (
    <div>
      <Card style={style.card}>
        <CardHeader title="ZPID" />
        <CardText>{zpid}</CardText>
      </Card>
    </div>
  );
}

ZillowZpid.propTypes = {
  zpid: propTypes.string
}

export default ZillowZpid;
