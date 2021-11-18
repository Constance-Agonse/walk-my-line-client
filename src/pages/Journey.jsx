import InfoPin from '../components/InfoPin';
import './Journey.css';
import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { Room } from "@material-ui/icons";
import NavBar from '../components/NavBar';
import Hashtags from "./../components/Hashtags";
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import Testbutton from '../components/Testbutton';
import { Button } from '@material-ui/core';
import { useAuth } from "./../auth/UserContext";
import APIHandler from "./../api/APIHandler";

export default function Journey({ location, idProfile }) {
  const { currentUser } = useAuth();
  // console.log('currentUser');
  // console.log(currentUser);
  const [isFollow, setIsFollow] = useState(true);
  const [btnUnfollow, setbtnUnfollow] = useState(true);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "60vh",
    latitude: location.state.latInitial,
    longitude: location.state.longInitial,
    zoom: 11.5
  });

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
    // console.log(currentUser)
  }, [])
  // console.log('location.state.isLikedBy',)
  // console.log(location.state.isLikedBy)
  // console.log('location.state.creator._id',)
  // console.log(location.state.creator._id)
  // console.log('req.session.currentUser',)
  // console.log(req.session.currentUser)
  

  const removeFromIslikedBy = () => {
    if (!isFollow) {
      console.log('location.state.isLikedBy')
      console.log(location.state.isLikedBy)
      console.log('location.state.creator._id')
      console.log(location.state.creator._id)
      console.log('location.state')

console.log(location.state)

      const newIsLikedBy = location.state.isLikedBy.filter((e) => {
        
        return (e._id !== idProfile)
        
      })
      console.log('newIsLikedBy')
      console.log(newIsLikedBy)
      // location.state.isLikedBy.includes(currentUser)
    } 
  
  }
const buttonRemove = () => {
  removeFromIslikedBy();
  setIsFollow((prev) => (prev = !prev))

}

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
          <Marker
            latitude={location.state.latInitial}
            longitude={location.state.longInitial}
            offsetLeft={-20}
            offsetTop={-10}>
            <Room style={{ fontSize: viewport.zoom * 3, color: '#fb8500' }} />
            {/* le zoom * 3 permet d'avoir un icon qui s'adapte avec le zoom effectué */}
          </Marker>

        </ReactMapGL>
      </div>

      <div id="journey-bar-bg">
        <div id="journey-bar">
          <div id="journey-bar-info">
            <div id="journey-bar-info-title">
              {/* ATTENTION BIEN REMPLACER TOUTES LES VARIABLES */}
              {/* <h2>{location.state.title} </h2> */}
              Beautiful trip in Paris
              <h3>By {location.state.creator.username} </h3>

            </div>
            <div id="journey-bar-info-location">
              <h2>City</h2>
              <h3>Country</h3>
            </div>
            <div id="journey-bar-info-text">
              <p>{location.state.km} km</p>
              <p>{location.state.journeyTime} min</p>
              <p>{location.state.pins.length} pins</p>
              <p>{(location.state.isPublic) ? ("Public") : "Private"}</p>
            </div>
            <div id="journey-bar-info-line" >
              <div id="journey-bar-info-rate">
                <Rating>{location.state.rate}</Rating>
              </div>
              <div className="button-switch-container">
                
                {location.state.isLikedBy.includes(currentUser) ? (<Button onClick={() => setbtnUnfollow(prev => prev = true)}>Follow</Button>) : (<Button onClick={() => setbtnUnfollow(prev => prev = false)}>Unfollow</Button>)}
              
                <button className="button-switch" onClick={buttonRemove}>{isFollow ? "Follow" : "Unfollow"  }</button>
                
                {/* <button className="button-switch" onClick={() => setbtnUnfollow(prev => prev = true)}>Follow</button>

                <button className="button-switch" onClick={() => setbtnUnfollow(prev => prev = false)}>Unfollow</button> */}
                {/* <Testbutton text="Follow" /> */}
                {/* {btnUnfollow ? (
              <button className="button-switch" onClick={() => setbtnUnfollow(prev => prev = true)}>Follow</button>
            ): (
              <button className="button-switch" onClick={() => setbtnUnfollow(prev => prev = false)}>Unfollow</button>
            )} */}


              </div>
              {/* <Link id="journey-bar-info-follow">Follow/unfollow</Link> */}
            </div>
            <div id="journey-bar-info-hashtags">
              {location.state.tags.map((tag) => {
                return <Hashtags key={tag._id} text={tag} />
              }
              )}
            </div>
          </div>
          <div id="journey-bar-pins-container">
            {/* <p>Mapper sur l'array des pins correspondant au trajet, pour l'instant on le met en dur</p> */}
            <InfoPin />
            <InfoPin />
            <InfoPin />
            <InfoPin />
            <InfoPin />
            <InfoPin />
            <InfoPin />
            <InfoPin />
            <InfoPin />
          </div>
        </div>
      </div>
    </div>
  )
}
