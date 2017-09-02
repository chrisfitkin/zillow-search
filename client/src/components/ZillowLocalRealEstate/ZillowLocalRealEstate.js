import React from 'react';
import propTypes from 'prop-types';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const style = {
  card: {
    margin: '10px'
  },
  h2: {
    marginTop: '0px'
  },
  label: {
    textTransform: 'capitalize'
  },
  small: {
    fontStyle: 'italic'
  }
}

const labels = {
  'overview': 'Overview',
  'forSaleByOwner': 'For Sale By Owner',
  'forSale': 'For Sale',
};

const ZillowLocalRealEstate = (props) => {
  const { data } = props;
  if (!data) return false;  
  const name = data.region[0]['$'].name;
  const links = data.region[0].links[0];
  return (
    <div>
      <Card style={style.card}>
        <CardHeader title="Local Real Estate" />
        <CardText>
          <Table selectable={false}>
            <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableRowColumn style={style.label}>Region</TableRowColumn>
                <TableRowColumn style={style.label}>{name}</TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </CardText>
        <CardActions>
          {Object.entries(links).map((pair) => { // Loop through links
            const key = pair[0];
            const value = pair[1];
            return( <FlatButton
              key={key}
              href={value[0]}
              target="_blank"
              label={labels[key] || key}
              />);
            })}
        </CardActions>
      </Card>
    </div>
  );
}

ZillowLocalRealEstate.propTypes = {
  data: propTypes.object
};

export default ZillowLocalRealEstate;
