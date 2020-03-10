import React, { Component } from 'react';
import axios from 'axios';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

class Graphs extends Component {
  constructor() {
    super();
    this.state = {
      chartData: []
    };
  }

  componentDidMount() {

    axios
      .get('https://corana-virus-api.herokuapp.com/api/virus-data/time-series')
      .then(res => {
        this.setState({ chartData: res.data });

        console.log(res.data);
        console.log('time series loaded');
      })
      .catch(err => {
        console.log(err);
        console.log('time series not loaded');
      });
  }



  render() {
    return (
      <div className="container">
        <div className="row">
          {this.state.chartData.confirmed_cases === undefined ? <div /> : (
            <div className="col-md-6">
              <LineChart
                width={window.innerWidth<500?320:480}
                height={window.innerWidth<500?320:480}
                data={this.state.chartData.confirmed_cases}
                margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
              >
                <XAxis dataKey="date" />
                <YAxis type="number" domain={[0, dataMax=>(Math.ceil(dataMax/1000)*1000)]} />
                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#ff7300"
                  yAxisId={0}
                  dot={null}
                />
                {/* <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} /> */}
              </LineChart>

            <h3 style={{margin: 'auto', textAlign:'center'}}>Confrimed Cases</h3>
            </div>)
          }
          {this.state.chartData.deaths === undefined ? <div /> : (
            <div className="col-md-6">
              <LineChart
                width={window.innerWidth<500?320:480}
                height={window.innerWidth<500?320:480}
                data={this.state.chartData.deaths}
                margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
              >
                <XAxis dataKey="date" />
                <YAxis type="number" domain={[0, dataMax=>(Math.ceil(dataMax/1000)*1000)]} />
                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#ff7300"
                  yAxisId={0}
                  dot={null}
                />
                {/* <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} /> */}
              </LineChart>
              <h3 style={{margin: 'auto', textAlign:'center'}}>Deaths</h3>
            </div>)
          }
          {this.state.chartData.recovered === undefined ? <div /> : (
            <div className="col-md-6" style={{ margin: "auto" }}>
              <LineChart
                width={window.innerWidth<500?320:480}
                height={window.innerWidth<500?320:480}
                data={this.state.chartData.recovered}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <XAxis dataKey="date" />
                <YAxis type="number" domain={[0, dataMax=>(Math.ceil(dataMax/1000)*1000)]} />
                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#ff7300"
                  yAxisId={0}
                  dot={null}
                />
                {/* <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} /> */}
              </LineChart>
              <h3 style={{margin: 'auto', textAlign:'center'}}>Recovered</h3>
            </div>)}
        </div>
      </div>
    );
  }
}

export default Graphs;
