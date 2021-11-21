import React, { useEffect, useState, useRef, useCallback } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
import { Link } from "react-router-dom";
import { Room } from "@material-ui/icons"

import { Header } from '../../components/Header';
import { viewportParams } from '../../config/viewport';
import APIHandler from "./../../api/APIHandler";

import "./CreateJourneyPage.css";

export const CreateJourneyPage = () => {
  const [creator, setCreator] = useState()
  const [isSearchDone, setSearchDone] = useState()
  const [viewport, setViewport] = useState(viewportParams);
  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      setSearchDone(newViewport)
      console.log("isSearchDone dans view")

      console.log(isSearchDone)

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides
      });
    },
    []
  );

  const fetchCreator = async () => {
    try {
      const res = await APIHandler.get("/createSearchJourney");
      console.log("api res x=> ", res);
      setCreator(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {

    fetchCreator();
  }, []);

  return (
    <div className="CreateJourneyPage">
      <Header />
      <div className="CreateJourneyPage__map">
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
      </div>
    </div>
  );
}