import React, { Component } from 'react';

import './App.css';
import AppComponent from './Components/appcomponent';


class App extends Component {
  render() {
    // console.log(this.state.data)
    return (
      <React.Fragment>
        <AppComponent/>
      </React.Fragment >

    );
  }
}

export default App;
