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
      data: undefined
    };
  }

  componentDidMount() {
    axios
      .get('http://127.0.0.1:9000/api/virus-data/')
      .then(res => {
        this.setState({ data: res.data });

        console.log(res.data);
        console.log('yolo');
      })
      .catch(err => {
        console.log(err);
        console.log('swag');
      });
  }

  render() {
    return this.state.data === undefined ? (
      <div />
    ) : (
      <div>
        <Header />
        <Featured mapData={this.state.data} />
        <LiveFeed data={this.state.data} />
        <Table data={this.state.data} />
        <CountryTable data={this.state.data} />
      </div>
    );
  }
}

export default appcomponent;
