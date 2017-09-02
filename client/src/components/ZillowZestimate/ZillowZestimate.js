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

const ZillowZestimate = (props) => {
  const { data } = props;
  if (!data) return false;  
   // Convert data to US local number and date formats
  const moneyFormat = (number) => `$${Number.parseInt(number, 10).toLocaleString('en-US', { currency: data.amount[0]['$'].currency})}`;
  const dateFormat = (date) => (new Date(date)).toLocaleDateString('en-US');
  const amount = moneyFormat(data.amount[0]['_']);
  const lastUpdated = dateFormat(data['last-updated'][0]);
  const change = moneyFormat(data.valueChange[0]['_']);
  const changeDays = data.valueChange[0]['$'].duration;
  const valueLow = moneyFormat(data['valuationRange'][0].low[0]['_']);
  const valueHigh = moneyFormat(data['valuationRange'][0].high[0]['_']);
  const percentile = `${data.percentile[0]}%`;
  return (
    <div>
      <Card style={style.card}>
        <CardHeader title="Zestimate" />
        <CardText>
          <h2 style={style.h2}>{amount}</h2>
          <Table selectable={false}>
            <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableRowColumn style={style.label}>Last Updated</TableRowColumn>
                <TableRowColumn style={style.label}>{lastUpdated}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn style={style.label}>Change</TableRowColumn>
                <TableRowColumn style={style.label}>{change} <small style={style.small}>{`${changeDays} days`}</small></TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn style={style.label}>Range</TableRowColumn>
                <TableRowColumn style={style.label}>{`${valueLow} - ${valueHigh}`}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn style={style.label}>Percentile</TableRowColumn>
                <TableRowColumn style={style.label}>{percentile}</TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </CardText>
      </Card>
    </div>
  );
}

ZillowZestimate.propTypes = {
  data: propTypes.object
};

export default ZillowZestimate;
