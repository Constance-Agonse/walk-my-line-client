import React from 'react'

// react
import { useState, useRef, useCallback , useEffect} from 'react'
import { NavLink , Link} from "react-router-dom";
//icone
import {HomeRounded} from "@material-ui/icons";
import {PersonRounded} from '@material-ui/icons';

//mapbox
import ReactMapGL, { Marker } from 'react-map-gl';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import Geocoder from 'react-map-gl-geocoder' //, MapboxGeocoder , mapboxgl
import { Room } from "@material-ui/icons"

// import ReactMapboxGl from 'react-mapbox-gl';
// import DrawControl from 'react-mapbox-gl-draw';
// import MapboxDraw from '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.js'
import APIHandler from "./../api/APIHandler";




 
// Don't forget to import the CSS
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

export default function HomeSearch() {
    const [allJournies, setAllJournies] = useState([]);

    useEffect(() => {
        fetchJournies();
  }, []);

  const fetchJournies = async () => {
    try {
        //avec res je peux peut etre obtenir mon id
      const res = await APIHandler.get("/homeSearch");
      console.log("api res => ", res.data);
      setAllJournies(res.data); 
    } catch (err) {
      console.error(err);
    }
  };
    const [viewport, setViewport] = useState({
    width: "100vw",
    height: "85vh",
    latitude: 48.853,
    longitude: 2.3905,
    zoom: 11.5
  });

  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };
    //   setSearchDone(prevSearch => prevSearch = newViewport)
    // console.log("isSearchDone dans view")

    //   console.log(isSearchDone)

      // console.log(isSearchDone.latitude)

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides
      });
    },
    []
  );
  console.log('***')
    console.log(allJournies.length)
  console.log('***')

    // console.log(allJournies[0].length)
  console.log('***')

    // console.log(allJournies[0])


    return (
        <div className="global-create-container">
  
      <div className="innerBoxContainer map-container">
            <ReactMapGL
            ref={mapRef}
                {...viewport}
                mapboxApiAccessToken = "pk.eyJ1IjoiaHVnb3dhbGsiLCJhIjoiY2t2cjdnNmRnOG05cjJwcXd5bzdrcXNsMyJ9.V4USQMRev0gaQMP7zfrRlg"
                onViewportChange={nextViewport => setViewport(nextViewport)}
                mapStyle="mapbox://styles/hugowalk/ckvyzg1n629ta15mvc49rx7ll"
                id="map-create"                
                >
              <Geocoder
                mapRef={mapRef}
                onViewportChange={handleGeocoderViewportChange}
                mapboxApiAccessToken="pk.eyJ1IjoiaHVnb3dhbGsiLCJhIjoiY2t2cjdnNmRnOG05cjJwcXd5bzdrcXNsMyJ9.V4USQMRev0gaQMP7zfrRlg"
                position="top-left"
              />
            { allJournies.length !== 0 && 
            
                allJournies.map((journey,index)=> (
                    <Marker
                        key={index}
                        // latitude={journey.latInitial}
                        // longitude={journey.longInitial}
                        latitude={2.6041126260358}
                        longitude={28.850479576134404}
                        offsetLeft={-20}
                        offsetTop={-10}>
                        <Room style={{ fontSize: viewport.zoom * 3, color: '#fb8500' }} />.
                    </Marker>
            ))
            
            }
            {/* <DrawControl onDrawCreate={onDrawCreate} onDrawUpdate={onDrawUpdate} id="drawcontrol"/> */}

            </ReactMapGL>
            
         

      </div>
      <section id="menu">
        <div className="nav-icone-container">
          <NavLink to="/"><HomeRounded className="icone" /></NavLink>
          <NavLink to="/profile"><PersonRounded className="icone"/></NavLink>
        </div>
        <div id="feature-container">
            <Link to='/auth/signin'>Sign in</Link>
            <Link to='/auth/signup'>Sign up</Link>
        </div>
      </section>

        

    </div>
    )
}


{/* allJournies.map((journey,index)=> (
                    <Marker
                        key={index}
                        latitude={journey.latInitial}
                        longitude={journey.longInitial}
                        offsetLeft={-20}
                        offsetTop={-10}>
                        <Room style={{ fontSize: viewport.zoom * 3, color: '#fb8500' }} />.
                    </Marker>
            )) */}
                {/* console.log(allJournies[0].latInitial) */}
