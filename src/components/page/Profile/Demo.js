import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { styled } from '@mui/material/styles';
import { Animation } from '@devexpress/dx-react-chart';

import { Views as data } from './demo-data/data-vizualization';

const PREFIX = 'Demo';

const classes = {
  chart: `${PREFIX}-chart`,
};

const format = () => {
  return (tick) => {
    console.log(tick);
    return tick
  }
};

const Root = props => (
  <Legend.Root {...props} sx={{ display: 'flex', margin: 'auto', flexDirection: 'row' }} />
);
const Label = props => (
  <Legend.Label sx={{ pt: 1, whiteSpace: 'nowrap' }} {...props} />
);
const Item = props => (
  <Legend.Item sx={{ flexDirection: 'column' }} {...props} />
);

const ValueLabel = (props) => {
  const { text } = props;
  return (
    <ValueAxis.Label
      {...props}
      text={`${text}`}
    />
  );
};

const TitleText = props => (
  <Title.Text {...props} />
);

const StyledChart = styled(Chart)(() => ({
  [`&.${classes.chart}`]: {
    paddingRight: '20px',
  },
}));

export default class Demo extends React.PureComponent {
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
        <StyledChart
          data={chartData}
          className={classes.chart}
        >
          <ArgumentAxis tickFormat={format} />
          <ValueAxis
            labelComponent={ValueLabel}
          />
          <LineSeries
            name="Views"
            valueField="views"
            argumentField="day"
          />
          <LineSeries
            name="Raiting"
            valueField="rating"
            argumentField="day"
          />
          <Legend position="bottom" rootComponent={Root} itemComponent={Item} labelComponent={Label} />
          <Title
            text={`Number of views and rating relative to days`}
            textComponent={TitleText}
          />
          <Animation />
        </StyledChart>
      </Paper>
    );
  }
}
