import React, { Component } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from 'react-simple-maps';
import axios from 'axios';
// import back from '../../Components/IMAGE3.jpg';

const geoUrl =
  'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

const colors = ['#AA2277', '#183881', '#AF8C6E', '#2B8A9F', '#72A69B'];

class Map extends Component {
  constructor() {
    super();
    this.state = {
      mapData: [],
      highlighted: '',
      hovered: false
    };
  }

  componentDidMount() {
    axios
      .get('http://127.0.0.1:9000/api/world_data/')
      .then(res => {
        let data = res.data;
        const mapData = [...this.state.mapData, ...data];
        this.setState({ mapData });

        console.log(this.state.mapData);
      })
      .catch(err => {
        console.log(err);
        console.log('swag');
      });
  }

  handleMove = geo => {
    if (this.state.hovered) return;
    this.setState({
      hovered: true,
      highlighted: geo.properties.CONTINENT
    });
  };

  handleLeave = () => {
    this.setState({
      highlighted: '',
      hovered: false
    });
  };

  hoverColorWRTData = d => {
    const countryCode = d.properties.ISO_A2;
    // console.log(countryCode);

    return '#' + ((Math.random() * 0xffffff) << 0).toString(16);
  };

  fillColorWRTData = d => {
    const countryCode = d.properties.ISO_A2;
    
    const {mapData} = this.state;

    mapData.forEach(item => {
      // if(item)
    });

    return '#' + ((Math.random() * 0xffffff) << 0).toString(16);
  };
  render() {
    const { mapData } = this.state;
    return (
      <div
        className="carrousel_wrapper"
        style={{
          height: `${window.innerHeight}px`,
          overflow: 'hidden'
        }}
      >
        <div>
          <div
            className="carrousel_image"
            style={{
              background: `rgbA(100, 200, 255, 1)`,
              height: `${window.innerHeight}px`
            }}
          >
            <ComposableMap style={{ width: '100%', height: '100%' }}>
              <ZoomableGroup zoom={0.82}>
                <Geographies geography={geoUrl}>
                  {(geographies, projection) =>
                    geographies.map((geography, i) => (
                      <Geography
                        key={i}
                        cacheId={geography.properties.ISO_A3 + i}
                        geography={geography}
                        projection={projection}
                        onMouseMove={this.handleMove}
                        onMouseLeave={this.handleLeave}
                        style={{
                          default: {
                            fill: this.fillColorWRTData(geography),
                            stroke:
                              geography.properties.CONTINENT ===
                              this.state.highlighted
                                ? '#9E1030'
                                : '#B2A27D',
                            strokeWidth: 0.75,
                            outline: 'none',
                            transition: 'all 250ms'
                          },
                          hover: {
                            fill: this.hoverColorWRTData(geography),
                            stroke: '#9E1030',
                            strokeWidth: 0.75,
                            outline: 'none',
                            transition: 'all 250ms'
                          },
                          pressed: {
                            fill: '#DD4132',
                            stroke: '#9E1030',
                            strokeWidth: 0.75,
                            outline: 'none',
                            transition: 'all 250ms'
                          }
                        }}
                      />
                    ))
                  }
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>
          </div>
        </div>
      </div>
    );
  }
}

export default Map;
