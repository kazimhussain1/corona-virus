import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'


export default class CountriesAffected extends Component {
  
  state={
      arr:[
        {
          name:'Australia',
          NumberOfInfecions:'14462',
          Deaths:'304',
          Cured:'328'
        },
          {
            name: 'China',
            NumberOfInfecions: '1444462',
            Deaths: '3004',
            Cured: '328'
          },
          {
            name: 'India',
            NumberOfInfecions: '14462',
            Deaths: '304',
            Cured: '328'
          },
          {
            name: 'South Korea',
            NumberOfInfecions: '14462',
            Deaths: '304',
            Cured: '328'
          }
            

            
        
      ]
  }
  

  showTable=()=>{
    this.state.arr.map((country,key)=>(
          <tr>
            <td>
                {this.state.arr[key].name}
            </td>
            <td>
              {this.state.arr[key].NumberOfInfecions}
            </td>
            <td>
              {this.state.arr[key].Deaths}
            </td>
          
            <td>
              {this.state.arr[key].Cured}
            </td>
          
          </tr>
    ))
  }
  
  
  render() {
    return (
      <div className="CountriesAffected">
        <div classsName="tableHead">
          <span>
            <h1 id="Countryhead">Countries / Regions Affected</h1>

          </span>

        </div>
        <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>
                    Total:{this.state.arr.length}
                </th>
                <th>
                  Number of Infections
                </th>
                <th>
                  Deaths
                </th>
                <th>
                  Cured
                </th>
              </tr>
            </thead>
            <tbody>
            {this.state.arr.map((country, key) => (
              <tr>
                <td>
                  {this.state.arr[key].name}
                </td>
                <td>
                  {this.state.arr[key].NumberOfInfecions}
                </td>
                <td>
                  {this.state.arr[key].Deaths}
                </td>

                <td>
                  {this.state.arr[key].Cured}
                </td>

              </tr>
            ))}
            </tbody>
        </Table>
      </div>
    )
  }
}
