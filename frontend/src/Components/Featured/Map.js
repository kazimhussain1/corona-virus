import React, { Component } from 'react';
import  {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";
// import back from '../../Components/IMAGE3.jpg';

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";



const colors = ["#AA2277", "#183881", "#AF8C6E", "#2B8A9F", "#72A69B"]

class Map extends Component {

  state = {
    highlighted: "",
    hovered: false,
    colors: ["#AA2277", "#183881", "#AF8C6E", "#2B8A9F", "#72A69B"]
  };
  handleMove = geo => {
    if (this.state.hovered) return;
    this.setState({
      hovered: true,
      highlighted: geo.properties.CONTINENT
    });
  };
  handleLeave = () => {
    this.setState({
      highlighted: "",
      hovered: false
    });
  };
  fillColorWRTData = d=>{
    const color = this.state.colors[Math.round(Math.random()*4)]
    console.log(color)
    return color
  };
  render(){
  return (
  
      <div className="carrousel_wrapper"
        style={{
          height: `${window.innerHeight}px`,
          overflow: 'hidden',
        }}
      >

        <div>
          <div className="carrousel_image"
            style={{
              background: `rgbA(100, 200, 255, 1)`,
              height: `${window.innerHeight}px`,
            }}>
          <ComposableMap   
            style={{ width: "100%", height: "100%" }} 
            >
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
                        fill:
                          geography.properties.CONTINENT ===
                          this.state.highlighted
                            ? "#DD4132"
                            : "#F0EAD6",
                        stroke:
                          geography.properties.CONTINENT ===
                          this.state.highlighted
                            ? "#9E1030"
                            : "#B2A27D",
                        strokeWidth: 0.75,
                        outline: "none",
                        transition: "all 250ms"
                      },
                      hover: {
                        fill: this.fillColorWRTData(geography),
                        stroke: "#9E1030",
                        strokeWidth: 0.75,
                        outline: "none",
                        transition: "all 250ms"
                      },
                      pressed: {
                        fill: "#DD4132",
                        stroke: "#9E1030",
                        strokeWidth: 0.75,
                        outline: "none",
                        transition: "all 250ms"
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
};

export default Map;