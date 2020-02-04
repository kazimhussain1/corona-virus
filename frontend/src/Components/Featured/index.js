import React from 'react';
import BackgroundMap from './Map';
import CountDown from './CountDown';

class index extends React.Component {

  constructor(props){
    super(props);
    this.state={
      data:this.props.mapData
    }
  }

  

  render() {
    return (
      <div style={{ position: 'relative' }}>


        <BackgroundMap mapData={this.state.data}/>


        <CountDown total={this.state.data[this.state.data.length-1]} />
      </div>
    );

  }
};

export default index;