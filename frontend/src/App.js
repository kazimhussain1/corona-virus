import React from 'react';
import Header from './Components/Header/Header';
import Featured from './Components/Featured/index';
import LiveFeed from './Components/LiveUpdates/liveIndex';
import Table from './Components/Tablefeed/Tablefeed';
import Graph from './Components/Graph/Graph';
import CountryTable from './Components/CountriesAffected/CountriesAffected';
import './App.css';

function App() {
  return (
    <React.Fragment>
        <Header/>
        <Featured/>
        <LiveFeed/>
        <Table/>
        <CountryTable/>
    </React.Fragment>
    
  );
}

export default App;
