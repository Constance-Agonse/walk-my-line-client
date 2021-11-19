// //css
import './CreateSearchJourney.css';
import React from "react";
// import ReactDOM from "react-dom";
// import ReactMapboxGl from "react-mapbox-gl";
// import DrawControl from "react-mapbox-gl-draw";
// import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
// import mapboxgl from 'mapbox-gl'

// react
import { useState, useRef, useCallback, useEffect } from 'react'
import { NavLink, Link } from "react-router-dom";
//icone
import { HomeRounded } from "@material-ui/icons";
import { PersonRounded } from '@material-ui/icons';

//mapbox
import ReactMapGL from 'react-map-gl';
// import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import Geocoder from 'react-map-gl-geocoder' //, MapboxGeocoder , mapboxgl
// import ReactMapboxGl from 'react-mapbox-gl';
// import DrawControl from 'react-mapbox-gl-draw';
// import MapboxDraw from '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.js'
import APIHandler from "./../api/APIHandler";

import './CreateSearchJourney.css';
// import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
// /* eslint import/no-webpack-loader-syntax: off */
// mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;


// Don't forget to import the CSS


export default function CreateSearchJourney() {

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "75vh",
    latitude: 48.853,
    longitude: 2.3905,
    zoom: 11.5
  });
  const [isSearchDone, setSearchDone] = useState()
  const [creator, setCreator] = useState("")

  // console.log('firzst', isSearchDone)
  useEffect(() => {
    console.log(isSearchDone)
  }, [isSearchDone])

  const fetchCreator = async () => {
    try {
      const res = await APIHandler.get("/createSearchJourney");
      console.log("api res => ", res);
      setCreator(res.data._id);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {

    fetchCreator();
  }, []);


  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  // // // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      setSearchDone(newViewport)
      console.log("isSearchDone dans view")

      console.log(isSearchDone)

      // console.log(isSearchDone.latitude)

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides
      });
    },
    []
  );

  // const Map = ReactMapboxGl({
  //   accessToken:
  //     "pk.eyJ1IjoiaHVnb3dhbGsiLCJhIjoiY2t2cjdnNmRnOG05cjJwcXd5bzdrcXNsMyJ9.V4USQMRev0gaQMP7zfrRlg"
  // });

  return (

    <div id="global-create-container-searchjourney">

      <div className="map-container-searchjourney">
        <ReactMapGL
          ref={mapRef}
          {...viewport}
          mapboxApiAccessToken="pk.eyJ1IjoiaHVnb3dhbGsiLCJhIjoiY2t2cjdnNmRnOG05cjJwcXd5bzdrcXNsMyJ9.V4USQMRev0gaQMP7zfrRlg"
          onViewportChange={nextViewport => setViewport(nextViewport)}
          mapStyle="mapbox://styles/hugowalk/ckvyzg1n629ta15mvc49rx7ll"
          id="map-create"
        >
          <Geocoder
            mapRef={mapRef}
            onViewportChange={handleGeocoderViewportChange}
            mapboxApiAccessToken="pk.eyJ1IjoiaHVnb3dhbGsiLCJhIjoiY2t2cjdnNmRnOG05cjJwcXd5bzdrcXNsMyJ9.V4USQMRev0gaQMP7zfrRlg"
            position="top-left"
            id="input-geocoder"
          />


        </ReactMapGL>

        {/* <Map
        style="mapbox://styles/mapbox/streets-v9" // eslint-disable-line
        containerStyle={{
          height: "600px",
          width: "100vw"
        }}
      >
        <DrawControl onDrawCreate={onDrawCreate} onDrawUpdate={onDrawUpdate} id="drawcontrol"/>
      </Map> */}

      </div>
      <section id="menu-container-search-journey">
        <div className="nav-icone-container-searchjourney">
          <NavLink to="/"><HomeRounded /></NavLink>
          <NavLink to="/profile"><PersonRounded /></NavLink>
        </div>

        <div>

          {isSearchDone !== undefined && (
            <Link to={{
              pathname: '/createSearchJourney/create2',
              state: {
                creator: creator,
                isSearchDone: isSearchDone
              }
            }}>
            <div id="feature-container-searchjourney"> Next page ! </div>
              
            </Link>

          )}
        </div>
      </section>



    </div>
  )
}

// // ESSAI DEUX ****************************************

// import React from "react";
// import ReactDOM from "react-dom";
// import ReactMapboxGl from "react-mapbox-gl";
// import DrawControl from "react-mapbox-gl-draw";
// import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";


// // import "./styles.css";

// const Map = ReactMapboxGl({
//   accessToken:
//     "pk.eyJ1IjoiaHVnb3dhbGsiLCJhIjoiY2t2cjdnNmRnOG05cjJwcXd5bzdrcXNsMyJ9.V4USQMRev0gaQMP7zfrRlg"
// });

// export default function App() {
//   const onDrawCreate = ({ features }) => {
//     console.log(features);
//   };

//   const onDrawUpdate = ({ features }) => {
//     console.log(features);
//   };

//   return (
//     <div id="test">
//       <h2>Welcome to react-mapbox-gl-draw</h2>
//       <Map
//         // mapboxApiAccessToken = "pk.eyJ1IjoiaHVnb3dhbGsiLCJhIjoiY2t2cjdnNmRnOG05cjJwcXd5bzdrcXNsMyJ9.V4USQMRev0gaQMP7zfrRlg"
//         style="mapbox://styles/mapbox/streets-v9" // eslint-disable-line
//         containerStyle={{
//           height: "600px",
//           width: "100vw"
//         }}
//       >
//         <DrawControl onDrawCreate={onDrawCreate} onDrawUpdate={onDrawUpdate} id="drawcontrol"/>
//       </Map>
//     </div>
//   );
// }

// ReactDOM.render(<App />, document.getElementById("root"));

// //TROISIEME TEST
// import React from "react";
// import ReactDOM from "react-dom";
// import ReactMapboxGl from "react-mapbox-gl";
// import DrawControl from "react-mapbox-gl-draw";
// import { useState, useRef, useCallback } from 'react'

// import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
// import './CreateSearchJourney.css';

// // import "./styles.css";

// const Map = ReactMapboxGl({
//   accessToken:
//     "pk.eyJ1IjoiaHVnb3dhbGsiLCJhIjoiY2t2cjdnNmRnOG05cjJwcXd5bzdrcXNsMyJ9.V4USQMRev0gaQMP7zfrRlg"
// });

// export default function CreateSearchJourney() {

//   const onDrawCreate = ({ features }) => {
//     console.log(features);
//   };

//   const onDrawUpdate = ({ features }) => {
//     console.log(features);
//   };

//     const [viewport, setViewport] = useState({
//     width: "100vw",
//     height: "85vh",
//     latitude: 48.853,
//     longitude: 2.3905,
//     zoom: 13
//   });
//   // const [zoom, setZoom] = useState(12)
//   // const mapRef = useRef();
// console.log("map >>>")
// console.dir(Map)
//   return (
//     <div id="test">
//       <h2>Welcome to react-mapbox-gl-draw</h2>
//       <Map
//       // ref={mapRef}
//         // {...viewport}
//         // mapboxApiAccessToken = "pk.eyJ1IjoiaHVnb3dhbGsiLCJhIjoiY2t2cjdnNmRnOG05cjJwcXd5bzdrcXNsMyJ9.V4USQMRev0gaQMP7zfrRlg"
//         // onViewportChange={nextViewport => setViewport(nextViewport)}
//         // mapStyle="mapbox://styles/hugowalk/ckvyzg1n629ta15mvc49rx7ll"
//         // mapboxApiAccessToken = "pk.eyJ1IjoiaHVnb3dhbGsiLCJhIjoiY2t2cjdnNmRnOG05cjJwcXd5bzdrcXNsMyJ9.V4USQMRev0gaQMP7zfrRlg"
//         style="mapbox://styles/hugowalk/ckvyzg1n629ta15mvc49rx7ll" // eslint-disable-line
//         containerStyle={{
//           height: "600px",
//           width: "100vw",
//         }}
//       >
//         <DrawControl onDrawCreate={onDrawCreate} onDrawUpdate={onDrawUpdate} id="drawcontrol"/>
//       </Map>
//     </div>
//   );
// }

// ReactDOM.render(<App />, document.getElementById("root"));


// QUATRIEME TEST


// import React from "react";
// import ReactDOM from "react-dom";
// import ReactMapboxGl from "react-mapbox-gl";
// import DrawControl from "react-mapbox-gl-draw";
// import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
// import './CreateSearchJourney.css';
// import Geocoder from 'react-map-gl-geocoder' //, MapboxGeocoder , mapboxgl
// import { useState, useRef, useCallback } from 'react'
// import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'

// // // import "./styles.css";


// const Map = ReactMapboxGl({
//   accessToken:
//     "pk.eyJ1IjoiaHVnb3dhbGsiLCJhIjoiY2t2cjdnNmRnOG05cjJwcXd5bzdrcXNsMyJ9.V4USQMRev0gaQMP7zfrRlg"
// });

// export default function CreateSearchJourney() {

//   const [viewport, setViewport] = useState({
//     width: "100vw",
//     height: "85vh",
//     latitude: 48.853,
//     longitude: 2.3905,
//     zoom: 11.5
//   });

//   // const mapRef = useRef();

//   const handleViewportChange = useCallback(
//     (newViewport) => setViewport(newViewport),
//     []
//   );
//   // // // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
//   const handleGeocoderViewportChange = useCallback(
//     (newViewport) => {
//       const geocoderDefaultOverrides = { transitionDuration: 1000 };

//       return handleViewportChange({
//         ...newViewport,
//         ...geocoderDefaultOverrides
//       });
//     },
//     []
//   );

//   const onDrawCreate = ({ features }) => {
//     console.log(features);
//   };

//   const onDrawUpdate = ({ features }) => {
//     console.log(features);
//   };

//   return (
//     <div id="test">
//       <h2>Welcome to react-mapbox-gl-draw</h2>
//       <Map
//         style="mapbox://styles/hugowalk/ckvyzg1n629ta15mvc49rx7ll" // eslint-disable-line
//         containerStyle={{
//           height: "85vh",
//           width: "100vw"
//         }}
//         center= {[viewport.longitude,viewport.latitude]}
//         zoom= {[viewport.zoom]}
//         // ref={mapRef}
//       >

//               {/* <Geocoder
//                 // mapRef={mapRef}
//                 onViewportChange={handleGeocoderViewportChange}
//                 mapboxApiAccessToken="pk.eyJ1IjoiaHVnb3dhbGsiLCJhIjoiY2t2cjdnNmRnOG05cjJwcXd5bzdrcXNsMyJ9.V4USQMRev0gaQMP7zfrRlg"
//                 position="top-right"
//               /> */}

//         <DrawControl onDrawCreate={onDrawCreate} onDrawUpdate={onDrawUpdate} id="drawcontrol"/>
//       </Map>
//     </div>
//   );
// }




// import React from "react";
// import ReactDOM from "react-dom";
// import ReactMapboxGl from "react-mapbox-gl";
// import DrawControl from "react-mapbox-gl-draw";
// import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
// import './CreateSearchJourney.css';


// // import React from "react";
// // import ReactDOM from "react-dom";
// // import ReactMapboxGl from "react-mapbox-gl";
// // import DrawControl from "react-mapbox-gl-draw";
// // import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
// import "mapbox-gl-geocoder"
// import './CreateSearchJourney.css';
// // import Geocoder from 'react-map-gl-geocoder' //, MapboxGeocoder , mapboxgl
// // import { useState, useRef, useCallback } from 'react'
// import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'

// // import "./styles.css";

// const Map = ReactMapboxGl({
//   accessToken:
//     "pk.eyJ1IjoiaHVnb3dhbGsiLCJhIjoiY2t2cjdnNmRnOG05cjJwcXd5bzdrcXNsMyJ9.V4USQMRev0gaQMP7zfrRlg"
// });

// export default function App() {
//   const onDrawCreate = ({ features }) => {
//     console.log(features);
//   };

//   const onDrawUpdate = ({ features }) => {
//     console.log(features);
//   };



//   mapboxgl.accessToken = 'pk.eyJ1IjoiaHVnb3dhbGsiLCJhIjoiY2t2cjdnNmRnOG05cjJwcXd5bzdrcXNsMyJ9.V4USQMRev0gaQMP7zfrRlg';
// const map = new mapboxgl.Map({
// container: 'map',
// style: 'mapbox://styles/mapbox/streets-v11',
// center: [-79.4512, 43.6568],
// zoom: 13
// });

// // Add the control to the map.
// map.addControl(
// new MapboxGeocoder({
// accessToken: mapboxgl.accessToken,
// mapboxgl: mapboxgl
// })
// );


//   return (
//     <div id="map">
//       {/* <h2>Welcome to react-mapbox-gl-draw</h2>
//       <Map
//         // mapboxApiAccessToken = "pk.eyJ1IjoiaHVnb3dhbGsiLCJhIjoiY2t2cjdnNmRnOG05cjJwcXd5bzdrcXNsMyJ9.V4USQMRev0gaQMP7zfrRlg"
//         style="mapbox://styles/mapbox/streets-v9" // eslint-disable-line
//         containerStyle={{
//           height: "600px",
//           width: "100vw"
//         }}
//       > */}
//         <DrawControl onDrawCreate={onDrawCreate} onDrawUpdate={onDrawUpdate} id="drawcontrol"/>
//       {/* </Map> */}
//     </div>
//   );
// }

// ReactDOM.render(<App />, document.getElementById("root"));