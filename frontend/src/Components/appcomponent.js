import React, { Component } from 'react';
import Header from './Header/Header';
import Featured from './Featured/index';
import LiveFeed from './LiveUpdates/liveIndex';
import Table from './Tablefeed/Tablefeed';
import Graph from './Graph/Graph';
import CountryTable from './CountriesAffected/CountriesAffected';
import axios from 'axios';

class appcomponent extends Component {
  constructor() {
    super();

    this.state = {
      data: []
    };
  }

  componentDidMount() {
    axios
      .get('https://corana-virus-api.herokuapp.com/api/virus-data/')
      .then(res => {
        this.setState({ data: res.data });

        console.log(res.data);
        console.log('virus data loaded');
      })
      .catch(err => {
        console.log(err);
        console.log('virus data not loaded');
      });
  }

  render() {
    return this.state.data.length === 0 ? (
      <div />
    ) : (
        <div>
          <Header />
          <Featured mapData={this.state.data} />
          <LiveFeed data={this.state.data} />
          <Table data={this.state.data} />
          <CountryTable data={this.state.data} />
          <Graph />
        </div>
      );
  }
}

export default appcomponent;
