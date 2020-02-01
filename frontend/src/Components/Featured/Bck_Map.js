import React from 'react';
import  {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

//import back from '../../Components/IMAGE3.jpg';


const Bck_Map = () => {
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
              // background: `url(${back})`,
              height: `${window.innerHeight}px`,
            }}>
          <ComposableMap>
            <ZoomableGroup zoom={1}>
              <Geographies geography={geoUrl}>
                
                {({ geographies }) =>
                  geographies.map(geo => (
                    <Geography key={geo.rsmKey} geography={geo} />
                  ))
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
            </div>
        </div>
       
      </div>
   
  );
};

export default Bck_Map;