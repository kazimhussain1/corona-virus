import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';



class Tablefeed extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: this.props.data[this.props.data.length - 1]
    }
  }


  render() {
    return (
      <div className="Tablefeed">
        <span className="Tablefeed-header">
          <h1 className="head-table">Statistics</h1>
          <h3>Source:WHO</h3>
        </span>

        <div className="container" style={{ marginTop: 50 }}>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>

                <th></th>

                <th>THE WHUAN VIRUS</th>
              </tr>
            </thead>
            <tbody>
              <tr>

                <td>NUMBER OF INFECTIONS</td>

                <td>{this.state.data.confirmed_cases}</td>
              </tr>
              <tr>

                <td>Number of Deaths</td>

                <td>{this.state.data.deaths}</td>
              </tr>
              <tr>
                <td>Death rate</td>

                <td>{this.state.data.affected_countries}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>


    );
  }
}

export default Tablefeed;