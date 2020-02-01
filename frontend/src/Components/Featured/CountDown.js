import React, { Component } from 'react';
import Slide from 'react-reveal/Slide';
class CountDown extends Component {
  state = {
    
    infected: '0',
    Deaths: '0',
    Countries: '0',
  
  }
  

  render() {
    return (

      <Slide left delay={1000}>
        <div className="countdown_wrapper">
          <div className="countdown_top">
            Corona Updates
                </div>
          <div className="countdown_bottom">
            <div className="countdown_item">
              <div className="countdown_time">
                {this.state.infected}
              </div>
              <div className="countdown_tag">
                Infected
                        </div>
            </div>
            <div className="countdown_item">
              <div className="countdown_time">
                {this.state.Deaths}
              </div>
              <div className="countdown_tag">
                Deaths
                        </div>
            </div>
            <div className="countdown_item">
              <div className="countdown_time">
                {this.state.Countries}
              </div>
              <div className="countdown_tag">
                Countries
                        </div>
            </div>

          </div>
        </div>

      </Slide>

    );
  }
}

export default CountDown;