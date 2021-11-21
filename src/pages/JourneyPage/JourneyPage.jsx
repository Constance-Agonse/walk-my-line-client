import React, { useEffect, useState } from 'react';
import { Panel } from '../../components/Panel';
import { Room } from "@material-ui/icons";
import ReactMapGL, { Source, Layer, Marker } from 'react-map-gl';

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
        <Panel>
          {JSON.stringify(journeyData)}
        </Panel>
      </div>
    </div>
  );
}