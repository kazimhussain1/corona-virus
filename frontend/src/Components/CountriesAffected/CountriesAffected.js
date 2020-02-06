import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'


export default class CountriesAffected extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data: this.props.data
    }
  }


  // showTable=()=>{
  //   this.state.arr.map((country,key)=>(
  //         <tr>
  //           <td>
  //               {this.state.arr[key].name}
  //           </td>
  //           <td>
  //             {this.state.arr[key].NumberOfInfecions}
  //           </td>
  //           <td>
  //             {this.state.arr[key].Deaths}
  //           </td>

  //           <td>
  //             {this.state.arr[key].Cured}
  //           </td>

  //         </tr>
  //   ))
  // }


  render() {
    return (
      <div className="CountriesAffected mr-5 ml-5">
        <div classsName="tableHead">
          <span>
            <h1 id="Countryhead">Countries / Regions Affected</h1>

          </span>

        </div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th className="tableheaderone">
                Total:{this.state.data.length - 1}
              </th>
              <th className="tableheaderone">
                Number of Infections
                </th>
              <th className="tableheaderone">
                Deaths
                </th>

            </tr>
          </thead>
          <tbody>
            {this.state.data.map((country, key) => (
              <tr>
                <td>
                  {this.state.data[key].place}
                </td>
                <td>
                  {this.state.data[key].confirmed_cases}
                </td>
                <td>
                  {this.state.data[key].deaths}
                </td>


              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )
  }
}
