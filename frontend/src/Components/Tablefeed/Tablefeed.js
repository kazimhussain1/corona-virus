import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';



class Tablefeed extends Component {
  state = {
    arr:[{
      NumberofInfections:{
        sars: 8069,
        wuhan: 14640
      },
      NumberofDeaths:{
        sars:779,
        wuhan:305
      },
      Deathrate:{
        sars:'9.65%',
        wuhan:'2.65%'
      }
      
    }]
  
  }


  render() {
    return (
        <div className="Tablefeed">
            <span className="Tablefeed-header">
          <h1 className="head-table">Statistics</h1>
                <h3>Source:WHO</h3>
            </span>

            <div className="container" style={{marginTop:50}}>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
               
                <th></th>
                <th>SARS</th>
                <th>THE WHUAN VIRUS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                
                <td>NUMBER OF INFECTIONS</td>
                <td>{this.state.arr[0].NumberofInfections.sars}</td>
                <td>{this.state.arr[0].NumberofInfections.wuhan}</td>
              </tr>
              <tr>
                
              <td>Number of Deaths</td>
                <td>{this.state.arr[0].NumberofDeaths.sars}</td>
               <td>{this.state.arr[0].NumberofDeaths.wuhan}</td>
              </tr>
              <tr>
    <td>Death rate</td>
    <td >{this.state.arr[0].Deathrate.sars}</td>
                <td>{this.state.arr[0].Deathrate.wuhan}</td>
              </tr>
            </tbody>
          </Table>
        </div>
        </div>
    

    );
  }
}

export default Tablefeed;