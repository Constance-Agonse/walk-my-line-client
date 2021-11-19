import InfoPin from '../components/InfoPin';
import './Journey.css';
import React, { useState, useEffect } from 'react';
import ReactMapGL, { Source, Layer , Marker } from 'react-map-gl';
import { Room } from "@material-ui/icons";
import NavBar from '../components/NavBar';
import Hashtags from "./../components/Hashtags";
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import Testbutton from '../components/Testbutton';
import { Button } from '@material-ui/core';
import { useAuth } from "./../auth/UserContext";
import APIHandler from "./../api/APIHandler";

export default function Journey({ location }) {
  console.log('xxxxxxxxxxxxxxx')
  console.log(location.state.journeyData)

  const { currentUser } = useAuth();
  const journeyData = location.state.journeyData;
  console.log('journeyData');
  console.log(journeyData);
  console.log(journeyData.geometry);

  // console.log('journeyData');
  // console.log(journeyData);
  // console.log('currentUser');
  // console.log(currentUser);
  const [isFollow, setIsFollow] = useState(true);
  const [btnUnfollow, setbtnUnfollow] = useState(true);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "60vh",
    latitude: journeyData.latInitial,
    longitude: journeyData.longInitial,
    zoom: 11.5
    // bearing: 0,
    //     pitch: 0,
    //     dragPan: true,
  });
 
  const dataOne = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        // coordinates: [
        //   [-96.93999779479579, 32.869829324179136],
        //   [-96.6441240934782, 32.8105861524909s3]
        // ]
        coordinates: journeyData.geometry[0]
      }
    };


  // const fetchCurrentUser = async () => {
  //   try {
  //     const res = await APIHandler.get("/profile");
  //     console.log("api res => ", res);
  //     setUserId(res.data[1]);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  useEffect(() => {
    console.log(">>>>>>>>",journeyData);
  }, [])
  // console.log('journeyData.isLikedBy',)
  // console.log(journeyData.isLikedBy)
  // console.log('journeyData.creator._id',)
  // console.log(journeyData.creator._id)
  // console.log('req.session.currentUser',)
  // console.log(req.session.currentUser)


  const removeFromIslikedBy = () => {
    if (!isFollow) {
      console.log('journeyData.isLikedBy')
      console.log(journeyData.isLikedBy)
      console.log('journeyData.creator._id')
      console.log(journeyData.creator._id)
      console.log('journeyData')

      console.log(journeyData)

      const newIsLikedBy = journeyData.isLikedBy.filter((e) => {

        return (e._id !== currentUser)

      })
      console.log('newIsLikedBy')
      console.log(newIsLikedBy)
      // journeyData.isLikedBy.includes(currentUser)
    }

  }
  const buttonRemove = () => {
    removeFromIslikedBy();
    setIsFollow((prev) => (prev = !prev))

  }

  
//   async function getMatch(coordinates, radius, profile) {
//   // Separate the radiuses with semicolons
//       const radiuses = radius.join(';');
//       // Create the query
//       const query = await fetch(
//       `https://api.mapbox.com/matching/v5/mapbox/${profile}/${coordinates}?geometries=geojson&radiuses=${radiuses}&steps=true&access_token=${mapboxgl.accessToken}`,
//       { method: 'GET' }
//       );
//       const response = await query.json();
//       // Handle errors
//       if (response.code !== 'Ok') {
//         alert(
//         `${response.code} - ${response.message}.\n\nFor more information: https://docs.mapbox.com/api/navigation/map-matching/#map-matching-api-errors`
//         );
//       return;
//       }
//       const coords = response.matchings[0].geometry;
//       // Draw the route on the map
//       addRoute(coords);
//   }

  return (
    <div id="journey-global">
      <NavBar />
      <div className="journey-map">
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken="pk.eyJ1IjoiaHVnb3dhbGsiLCJhIjoiY2t2cjdnNmRnOG05cjJwcXd5bzdrcXNsMyJ9.V4USQMRev0gaQMP7zfrRlg"
          onViewportChange={nextViewport => setViewport(nextViewport)}
          mapStyle="mapbox://styles/hugowalk/ckvvj03ck2ojj14nmd442pqot"
          className="journey-map-mapbox"
        >       

        <Source id="polylineLayer" type="geojson" data={dataOne}>
          <Layer
            id="lineLayer"
            type="line"
            source="my-data"
            layout={{
              "line-join": "round",
              "line-cap": "round"
            }}
            paint={{
              "line-color": "rgba(97, 132, 105, 1)",
              "line-width": 8,
              'line-opacity': 0.8
            }}
          />
        </Source> 

          {journeyData.pins && journeyData.pins.map((pin,i)=> (
                <Marker
                  latitude={pin.lat}
                  longitude={pin.long}
                  offsetLeft={-20}
                  offsetTop={-10}
                  key={i}>
                      <Room key={i} style={{ fontSize: viewport.zoom * 3, color: '#955E44' }} />
                </Marker>  
          ))} 
  
        </ReactMapGL>
      </div>

      <div id="journey-bar-bg">
        <div id="journey-bar">
          <div id="journey-bar-info">
            <div id="journey-bar-info-title">
              {/* ATTENTION BIEN REMPLACER TOUTES LES VARIABLES */}
              {/* <h2>{journeyData.title} </h2> */}
              A trip
              
              <h3>By {journeyData.creator.username} </h3>

            </div>
            <div id="journey-bar-info-location">
              <h2>City</h2>
              <h3>Country</h3>
            </div>
            <div id="journey-bar-info-text">
              <p>{journeyData.km} km</p>
              <p>{journeyData.journeyTime} min</p>
              <p>{journeyData.pins.length} pins</p>
              <p>{(journeyData.isPublic) ? ("Public") : "Private"}</p>
            </div>
            <div id="journey-bar-info-line" >
              <div id="journey-bar-info-rate">
                <Rating>{journeyData.rate}</Rating>
              </div>
              <div className="button-switch-container">

                <button className="button-switch" onClick={buttonRemove}>{isFollow ? "Follow" : "Unfollow"}</button>

              </div>
              {/* <Link id="journey-bar-info-follow">Follow/unfollow</Link> */}
            </div>
            <div id="journey-bar-info-hashtags">
              {journeyData.tags.map((tag , i) => {
                return <Hashtags key={i} text={tag} />
              }
              )}
            </div>
          </div>
          <div id="journey-bar-pins-container">
            {/* <p>Mapper sur l'array des pins correspondant au trajet, pour l'instant on le met en dur</p> */}
            {journeyData.pins && journeyData.pins.map((pin,i)=> (
              <InfoPin pin={pin} key={i}/>
            ))}            
          </div>
        </div>
      </div>
    </div>
  )
}
