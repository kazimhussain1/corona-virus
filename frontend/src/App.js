import React from 'react';
import Header from './Components/Header/Header';
import Featured from './Components/Featured/index';
import LiveFeed from './Components/LiveUpdates/liveIndex';
import './App.css';

function App() {
  return (
    <React.Fragment>
        <Header/>
        <Featured/>
        <LiveFeed/>
    </React.Fragment>
  );
}

export default App;
