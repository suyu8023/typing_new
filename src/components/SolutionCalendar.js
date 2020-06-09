/* eslint-disable */

import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import ReactTooltip from 'react-tooltip';
import moment from 'moment';

class SolutionCalendar extends React.Component {
  static defaultProps = {
    startDate: moment()
      .subtract(1, 'year')
      .add(1, 'day')
      .format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate() {
    ReactTooltip.rebuild();
  }
  render() {
    const { data, startDate, endDate } = this.props;

    return (
      <div>
        <CalendarHeatmap
          startDate={startDate}
          endDate={endDate}
          values={data || []}
          classForValue={value => {
            let level = 0;
            if (!value || value.count <= 0) {
              level = 0;
            } else if (value.count <= 2) {
              level = 1;
            } else if (value.count <= 5) {
              level = 2;
            } else if (value.count <= 10) {
              level = 3;
            } else {
              level = 4;
            }
            return `color-github-${level}`;
          }}
          tooltipDataAttrs={value => {
            if (!value || !value.count) {
              return null;
            }
            return {
              'data-tip': `[${value.date}] Record: ${value.count}`,
            };
          }}
        />
        <ReactTooltip />
      </div>
    );
  }
}

export default SolutionCalendar;
