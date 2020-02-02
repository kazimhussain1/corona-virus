import React from 'react';
import BackgroundMap from './Map';
import CountDown from './CountDown';

const index = () => {
  return (
    <div style={{ position: 'relative' }}>


      <BackgroundMap />

     
      <CountDown />
    </div>
  );
};

export default index;