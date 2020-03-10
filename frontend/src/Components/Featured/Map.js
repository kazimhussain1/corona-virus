import React, { Component } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from 'react-simple-maps';
// import back from '../../Components/IMAGE3.jpg';

// const geoUrl =
//   'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';
const geoUrl = 'https://corana-virus-api.herokuapp.com/api/mapTopoData';
const geoUrlChina =
  'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/china/china-provinces.json';

const colors = ['#EC7D58', '#E1674E', '#CF443D', '#C53134', '#74181A'];
const hoverColors = ['#F78762', '#EA7057‬', '#D84D46', '#CE3A3D', '#7D2123'];


class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapData: this.props.mapData,
      highlighted: '',
      hovered: false
    };
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

    const { mapData } = this.state;

    let color = '#E7E7E7';
    mapData.forEach(item => {
      if (item.code === countryCode) {
        if (item.confirmed_cases > 10000) color = hoverColors[4];
        else if (item.confirmed_cases > 1000) color = hoverColors[3];
        else if (item.confirmed_cases > 100) color = hoverColors[2];
        else if (item.confirmed_cases > 10) color = hoverColors[1];
        else if (item.confirmed_cases > 1) color = hoverColors[0];
      }
    });

    return color;
  };

  fillColorWRTData = d => {
    const countryCode = d.properties.ISO_A2;

    const { mapData } = this.state;

    let color = '#DDDDDD';
    mapData.forEach(item => {
      if (item.code === countryCode) {
        if (item.confirmed_cases > 10000) color = colors[4];
        else if (item.confirmed_cases > 1000) color = colors[3];
        else if (item.confirmed_cases > 100) color = colors[2];
        else if (item.confirmed_cases > 10) color = colors[1];
        else if (item.confirmed_cases > 1) color = colors[0];
      }
    });

    return color;
  };
  render() {
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
              background: `#EEEEEE`,
              height: `${window.innerHeight}px`
            }}
          >
            <ComposableMap style={{ width: '100%', height: '100%' }}>
              <ZoomableGroup zoom={window.innerWidth<500?1:0.82} disablePanning={true}>
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
                            stroke: '#242424',
                            strokeWidth: 0.25,
                            outline: 'none',
                            transition: 'all 250ms'
                          },
                          hover: {
                            fill: this.hoverColorWRTData(geography),
                            stroke: '#000000',
                            strokeWidth: 0.75,
                            outline: 'none',
                            transition: 'all 250ms'
                          },
                          pressed: {
                            fill: this.hoverColorWRTData(geography),
                            stroke: '#000000',
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
