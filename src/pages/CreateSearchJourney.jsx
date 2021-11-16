//css
import './CreateSearchJourney.css';

//react
import React, { useState, 
  // useRef, useCallback 
} from 'react'
import { NavLink } from "react-router-dom";
//icone
import {HomeRounded} from "@material-ui/icons";
import {PersonRounded} from '@material-ui/icons';

//mapbox
import ReactMapGL from 'react-map-gl';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
// import Geocoder from 'react-map-gl-geocoder'


export default function CreateSearchJourney() {

  const [viewport, setViewport] = useState({
    width: "90vw",
    height: "90vh",
    latitude: 48.853,
    longitude: 2.3905,
    zoom: 11.5
  });

  // const mapRef = useRef();
  // const handleViewportChange = useCallback(
  //   (newViewport) => setViewport(newViewport),
  //   []
  // );

  // // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  // const handleGeocoderViewportChange = useCallback(
  //   (newViewport) => {
  //     const geocoderDefaultOverrides = { transitionDuration: 1000 };

  //     return handleViewportChange({
  //       ...newViewport,
  //       ...geocoderDefaultOverrides
  //     });
  //   },
  //   []
  // );

  return (
    <div className="global-create-container">
  
      <div className="innerBoxContainer map-container">
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken = "pk.eyJ1IjoiaHVnb3dhbGsiLCJhIjoiY2t2cjdnNmRnOG05cjJwcXd5bzdrcXNsMyJ9.V4USQMRev0gaQMP7zfrRlg"
                onViewportChange={nextViewport => setViewport(nextViewport)}
                mapStyle="mapbox://styles/hugowalk/ckvyzg1n629ta15mvc49rx7ll"
                className="map"                
                >
              {/* <Geocoder
                mapRef={mapRef}
                // onViewportChange={handleGeocoderViewportChange}
                mapboxApiAccessToken="pk.eyJ1IjoiaHVnb3dhbGsiLCJhIjoiY2t2cjdnNmRnOG05cjJwcXd5bzdrcXNsMyJ9.V4USQMRev0gaQMP7zfrRlg"
                position="top-left"
              /> */}

            </ReactMapGL>
      </div>
      <section id="menu">
        <div className="nav-icone-container">
          <NavLink to="/"><HomeRounded className="icone" /></NavLink>
          <NavLink to="/profile"><PersonRounded className="icone"/></NavLink>
        </div>
        <div id="pins-container">
          <button>A</button>
          <button>V</button>
          <button>I</button>
          <button>T</button>
        </div>
        <div id="feature-container">
          <button>#addATag</button>
          <button>Done !</button>
          <button>#Public</button>
        </div>
      </section>

        

    </div>
  )
}


