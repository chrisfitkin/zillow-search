import React from 'react';
import propTypes from 'prop-types';
import { Card, CardHeader, CardText } from 'material-ui/Card';
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
  label: {
    textTransform: 'capitalize'
  }
}

const ZillowAddress = (props) => {
  const { data } = props;
  const labels = {
      'zipcode': 'Zip Code'
  };
  return data ? (
    <div>
        <Card style={style.card}>
          <CardHeader title="Address" />
          <CardText>
            <Table selectable={false}>
              <TableBody displayRowCheckbox={false}>
                {Object.entries(data).map((pair) => { // Loop through data rows
                  const key = pair[0];
                  const value = pair[1];
                  return( <TableRow key={key} selectable={false}>
                      <TableRowColumn style={style.label}>{labels[key] || key}</TableRowColumn>
                      <TableRowColumn>{value[0]}</TableRowColumn>
                    </TableRow> );
                  })}
              </TableBody>
            </Table>
          </CardText>
        </Card>
    </div>
  ) : false;
}

ZillowAddress.propTypes = {
  data: propTypes.object
};

export default ZillowAddress;
