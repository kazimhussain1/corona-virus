import React, { Component } from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Zoom from 'react-reveal/Zoom';
import axios from 'axios'

export default class liveIndex extends Component {

  constructor(props) {
    super(props)

    this.state = {

      newsData: []
    }
  }



  componentDidMount() {
    axios.get('http://127.0.0.1:9000/api/news')
      .then(res => {
        // console.log(res.data.articles);
        this.setState({ newsData: res.data.articles })
      })
      .catch(err => { console.log(err) })
  }

  showBoxes = () => (
    this.state.newsData.map((box, i) => (

      <Zoom >
        <div className="pricing_item">
          <div className="pricing_inner_wrapper">
            <div className="pricing_title">
              <a className="source" href={box.url}><span className="source">{this.state.newsData[i].source.name}</span></a>
              <span className="headline">{this.state.newsData[i].title}</span>
            </div>
            <div className="pricing_description">
              {this.state.newsData[i].description}

              <div className="time">
                {this.state.newsData[i].publishedAt}
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
