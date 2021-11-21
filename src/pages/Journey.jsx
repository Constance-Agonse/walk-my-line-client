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
import KmTimeInfo from '../components/kmTimeInfo';

export default function Journey({ location }) {
  console.log('xxxxxxxxxxxxxxxLocationxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
  console.log("journeyData -->",location.state.journeyData)
  const journeyData = location.state.journeyData;
  const { currentUser } = useAuth();
  console.log("current user ->",currentUser)

  const [isFollow, setIsFollow] = useState(true);
  // const [btnUnfollow, setbtnUnfollow] = useState(true);
  // const [journeyData, setJourneyData] = useState(location.state.journeyData);
  // const journeyData = location.state.journeyData; //on le fait depuis le usestate now | finalement non pas besoin pour la modification de siLikedBy
   

  useEffect(()=>{
    // console.log("Le button INITIALEMENT :",isFollow)
    // console.log(currentUser._id)
    // console.log(journeyData.isLikedBy)
    let isCreatorInlist;
    let a = journeyData.isLikedBy.filter(el => el._id === currentUser._id).length;
    // console.log(a);
    (journeyData.isLikedBy.filter(el => el._id === currentUser._id).length) ? (isCreatorInlist = true) : (isCreatorInlist = false);
    // let isCreatorInlist = journeyData.isLikedBy.includes(currentUser._id);
    // console.log(isCreatorInlist)
    setIsFollow(prev => prev = isCreatorInlist); //pas logique de mettre l'inverse mais permet de revenir à la normal
    // console.log("Le button APRES :",isFollow)

  },[])

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
        coordinates: journeyData.geometry[0]
      }
    };

  // useEffect(() => {
  //   console.log(">>>>>>>>",journeyData);
  // }, [])
  // console.log('journeyData.isLikedBy',)
  // console.log(journeyData.isLikedBy)
  // console.log('journeyData.creator._id',)
  // console.log(journeyData.creator._id)
  // console.log('req.session.currentUser',)
  // console.log(req.session.currentUser)


  const updateFollowStatus = async () => {
    try {
      //avec res je peux peut etre obtenir mon id
      const res = await APIHandler.patch("/journey", journeyData);
      // console.log("api res => ", res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const removeOrAddtoIslikedBy = () => {
    if (!isFollow) { //si on follow alors on ajoute currentuser à l'array de isLikedBy
      // faire une requete axios qui demande au server d'ajouter dans la database
      journeyData.isLikedBy.push(currentUser)
      updateFollowStatus();
      // console.log('should be added :' ,journeyData)
    } else { //si on unfollow alors on enleve currentuser à l'array de isLikedBy
      // on renvoie un nouvel array qui contient uniquement les user (id) différents de celui qui à unfollow (attention il s'agit de l'array de isLikedBy)      
      let newRemoveIsLikedBy = journeyData.isLikedBy.filter((user) => user._id !== currentUser._id)
      journeyData.isLikedBy = newRemoveIsLikedBy
      updateFollowStatus();
      // console.log('should be removed :' ,journeyData)

    }

  }

  const buttonFollow = () => {
    removeOrAddtoIslikedBy();
    setIsFollow((prev) => (prev = !prev)) // a commenter maybe parce qu'on peut le faire avec l'information pour que ca soit plus pertinent

  }

  
  // console.log("Le button APRES de vrai true=UNFOLOW false=FOLOW:",isFollow)

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
              <KmTimeInfo journeyData={journeyData}/>              
              <p>{journeyData.pins.length} pins</p>
              <p>{(journeyData.isPublic) ? ("Public") : "Private"}</p>
            </div>
            <div id="journey-bar-info-line" >
              <div id="journey-bar-info-rate">
                <Rating>{journeyData.rate}</Rating>
              </div>
              {currentUser._id !== journeyData.creator._id &&
              <div className="button-switch-container">
              
                  <button className="button-switch" onClick={buttonFollow}>{isFollow ? "Unfollow" : "Follow"}</button>

              </div>
              }
              
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
