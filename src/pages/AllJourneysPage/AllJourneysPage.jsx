import React, { useEffect, useState, useRef, useCallback } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
import { Link } from "react-router-dom";
import { Room } from "@material-ui/icons"

import { viewportParams } from '../../config/viewport';
import { Header } from '../../components/Header';
import APIHandler from "./../../api/APIHandler";

import "./AllJourneysPage.css";

export const AllJourneysPage = () => {
  const [allJournies, setAllJournies] = useState([]);

  useEffect(() => {
    fetchJournies();
  }, []);

  const fetchJournies = async () => {
    try {
      const res = await APIHandler.get("/homeSearch");
      setAllJournies(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const [viewport, setViewport] = useState(viewportParams);
  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };
      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides
      });
    },
    []
  );

  const renderMarkers = () => {
    if (allJournies.length > 0) {
      allJournies.map((journey, index) => (
        <Marker
          key={index}
          latitude={journey.latInitial}
          longitude={journey.longInitial}
          offsetLeft={-20}
          offsetTop={-10}>
          <Link to={{
            pathname: '/journey',
            state: {
              journeyData: journey,
            }
          }}>
            <Room key={index} style={{ fontSize: viewport.zoom * 8, color: '#955E44' }} />
          </Link>
        </Marker>
      ))
    }
    return null;
  }

  return (
    <div className="AllJourneysPage">
      <Header />
      <div className="AllJourneysPage__map">
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
          />
          {renderMarkers()}
        </ReactMapGL>
      </div>
    </div>
  );
}