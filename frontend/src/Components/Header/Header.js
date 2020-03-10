import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';

import Toolbar from '@material-ui/core/Toolbar';

export default class Header extends Component {
  state = {
    headerShow: false
  };
  componentDidMount() {
    window.addEventListener('scroll', this.scrollingoptions);
  }

  scrollingoptions = () => {
    this.setState({
      headerShow: window.scrollY > 0
    });
  };

  render() {
    return (
      <div>
        <AppBar
          position="fixed"
          style={{
            backgroundColor: this.state.headerShow ? '#2f2f2f' : 'transparent',
            color: this.state.headerShow ? '#EEEEEE' : '#2f2f2f',
            transition: 'all 0.3s',
            boxShadow: 'none',
            padding: '10px 0px'
          }}
        >
          <Toolbar>
            <div className="header_logo">
              <div className="font_righteous header_logo_venue">
                THE WUHAN VIRUS
              </div>
              <div className="header_logo_title">Deadly Airborne Pathogen</div>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
