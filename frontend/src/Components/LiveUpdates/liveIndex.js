  import React, { Component } from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Zoom from 'react-reveal/Zoom';

export default class liveIndex extends Component {
 
  state = {
    prices: ['CNN', 'CNA', 'CNN'],
    positions: ['[Singapore]:Singapore confident that China, other countries will work together to win battle against Wuhan coronavirus: PM Lee', '[Vietnam]:Vietnam says suspending all China flights over coronavirus', '[AUS]:Australia confirms new cases, bringing total to 12'],
    desc: ['Speaking at a Chinese New Year Celebration in Teck Ghee, Mr Lee said that everyone is concerned about the coronavirus as some may recall when the severe acute respiratory syndrome (SARS) hit Singapore in 2003.',
      'a passage between rows of seats, for example in a church, theatre, or plane, or between the ... theatre the part of a theatre, cinema etc where the audience sits ...',
      'All of this pristine sound is then pumped into a theatre that has been customized for an optimal ... But seeing a movie in an IMAX® theatre is so much more.'
    ],
    time: ['113 minutes ago', '113 minutes ago', '113 minutes ago'],
    
  }

  showBoxes = () => (
    this.state.prices.map((box, i) => (
      <Zoom >
        <div className="pricing_item">
          <div className="pricing_inner_wrapper">
            <div className="pricing_title">
              <span className="source">{this.state.prices[i]}</span>
              <span className="headline">{this.state.positions[i]}</span>
            </div>
            <div className="pricing_description">
              {this.state.desc[i]}
              <div className="time">
                {this.state.time[i]}
              </div>
            </div>
            
          

          </div>


        </div>
      </Zoom>
    ))

  )



  render() {
    return (
      <div className="bck_black">
        <div className="center_wrapper  pricing_section">

          <h2>Live Updates</h2>
          <div className="pricing_wrapper">
            {this.showBoxes()}
          </div>


        </div>
      </div>
    );
  }
}
