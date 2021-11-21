import React, { useEffect, useState } from 'react';
import { PanelCool } from '../../components/Panel';
import { Room } from "@material-ui/icons";
import ReactMapGL, { Source, Layer, Marker } from 'react-map-gl';

import CityCountry from '../../components/CityCountry';
import KmTimeInfo from '../../components/kmTimeInfo';
import Rating from '../../components/Rating';
import InfoPin from '../../components/InfoPin';
import APIHandler from "../../api/APIHandler";
import { useAuth } from "../../auth/UserContext";
import { Header } from '../../components/Header';

import "./JourneyPage.css";

export const JourneyPage = ({ location }) => {
  const journeyData = location.state.journeyData;
  const { currentUser } = useAuth();
  const [isFollow, setIsFollow] = useState(true);

  const dataOne = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: journeyData.geometry[0]
    }
  };

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: journeyData.latInitial,
    longitude: journeyData.longInitial,
    zoom: 11.5
  });

  useEffect(() => {
    let isCreatorInlist;
    let a = journeyData.isLikedBy.filter(el => el._id === currentUser._id).length;
    (journeyData.isLikedBy.filter(el => el._id === currentUser._id).length) ? (isCreatorInlist = true) : (isCreatorInlist = false);
    setIsFollow(prev => prev = isCreatorInlist); //pas logique de mettre l'inverse mais permet de revenir à la normal
  }, []);


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

  return (
    <div className="JourneyPage">
      <Header />
      <div className="JourneyPage__map">
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

          {journeyData.pins && journeyData.pins.map((pin, i) => (
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
      <div className="JourneyPage__callout-wrapper">
        {console.log(journeyData)}
        <PanelCool>
          <div className="JourneyPage__info">
            <div id="journey-bar-info-title">
              {journeyData.name}
              <h3>By {journeyData.creator.username} </h3>

            </div>
            <div id="journey-bar-info-location">
              <CityCountry journeyData={journeyData} />
              {/* <h2>City</h2>
              <h3>Country</h3> */}
            </div>
            <div id="journey-bar-info-text">
              <KmTimeInfo journeyData={journeyData} />
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
            </div>
            <div id="journey-bar-info-hashtags">
              {/* {journeyData.tags.map((tag, i) => {
                  return <Hashtags key={i} text={tag} />
                }
                )} */}
            </div>
          </div>
          <div id="journey-bar-pins-container">
            {/* <p>Mapper sur l'array des pins correspondant au trajet, pour l'instant on le met en dur</p> */}
            {journeyData.pins && journeyData.pins.map((pin, i) => (
              <div className="InfoPin">
                {pin.media && (<div className="InfoPin__pic" style={{ backgroundImage: `url(${pin.media})` }} />)}
                <div className="InfoPin__title">
                  {pin.title}
                </div>
                <div className="InfoPin__description">
                  {pin.description}
                </div>
              </div>
            ))}
          </div>
        </PanelCool>
      </div>
    </div>
  );
}