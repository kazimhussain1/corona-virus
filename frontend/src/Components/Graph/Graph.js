import React, { Component } from 'react';

import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  CartesianGrid,
  Label,
  LabelList
} from 'recharts';

class Graphs extends Component {
  constructor() {
    super();
    this.state = {
      chartData: [
        {
          date: '1/22/20',
          count: 555
        },
        {
          date: '1/23/20',
          count: 653
        },
        {
          date: '1/24/20',
          count: 941
        },
        {
          date: '1/25/20',
          count: 1434
        },
        {
          date: '1/26/20',
          count: 2118
        },
        {
          date: '1/27/20',
          count: 2927
        },
        {
          date: '1/28/20',
          count: 5578
        },
        {
          date: '1/29/20',
          count: 6166
        },
        {
          date: '1/30/20',
          count: 8234
        },
        {
          date: '1/31/20',
          count: 9927
        },
        {
          date: '2/1/20',
          count: 12038
        },
        {
          date: '2/2/20',
          count: 16787
        },
        {
          date: '2/3/20',
          count: 19881
        },
        {
          date: '2/4/20',
          count: 23892
        },
        {
          date: '2/5/20',
          count: 27636
        },
        {
          date: '2/6/20',
          count: 30818
        },
        {
          date: '2/7/20',
          count: 34392
        },
        {
          date: '2/8/20',
          count: 37121
        },
        {
          date: '2/9/20',
          count: 40151
        },
        {
          date: '2/10/20',
          count: 42763
        },
        {
          date: '2/11/20',
          count: 44803
        },
        {
          date: '2/12/20',
          count: 45222
        },
        {
          date: '2/13/20',
          count: 60370
        },
        {
          date: '2/14/20',
          count: 66887
        },
        {
          date: '2/15/20',
          count: 69032
        },
        {
          date: '2/16/20',
          count: 71226
        },
        {
          date: '2/17/20',
          count: 73260
        },
        {
          date: '2/18/20',
          count: 75138
        },
        {
          date: '2/19/20',
          count: 75641
        }
      ]
    };
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <LineChart
              width={480}
              height={480}
              data={this.state.chartData}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <Tooltip />
              <CartesianGrid stroke="#f5f5f5" />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#ff7300"
                yAxisId={0}
              />
              {/* <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} /> */}
            </LineChart>
          </div>
          <div className="col-md-6">
            <LineChart
              width={480}
              height={480}
              data={this.state.chartData}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <Tooltip />
              <CartesianGrid stroke="#f5f5f5" />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#ff7300"
                yAxisId={0}
              />
              {/* <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} /> */}
            </LineChart>
          </div>
          <div className="col-md-6" style={{margin:"auto"}}>
            <LineChart
              width={480}
              height={480}
              data={this.state.chartData}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <Tooltip />
              <CartesianGrid stroke="#f5f5f5" />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#ff7300"
                yAxisId={0}
              />
              {/* <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} /> */}
            </LineChart>
          </div>
        </div>
      </div>
    );
  }
}

export default Graphs;
