import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  PieSeries,
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

const data = [
  { rating: 'black', val: 100 - localStorage.getItem('rating') },
  { rating: 'rating', val: localStorage.getItem('rating') },
];

export default class RaitingDoughnut extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
    };
  }

  render() {
    const { data: chartData } = this.state;

    return (
      <Paper>
        <Chart
          data={chartData}
        >
          <PieSeries
            valueField="val"
            argumentField="rating"
            innerRadius={0.8}
          >
          <div id="rating123">{localStorage.getItem('rating')}</div>
          </PieSeries>
          <Title
            text="Rating"
          />
          <Animation />
        </Chart>
      </Paper>
    );
  }
}
