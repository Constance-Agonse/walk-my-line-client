import React from 'react';
import InfoPin from '../components/InfoPin';
import './Journey.css';

export default function Journey() {
  return (
    <div id="journey-global">
      <div id="journey-map">
        <img src="testcarte.png" id='journey-map-img' alt="test carte" />
      </div>
      <div id="journey-bar">
        <div id="journey-bar-info">
          <h2>City</h2>
          {/* <h3>Country</h3>
          <p>X km</p>
          <p>X time, min or h</p>
          <p>X pin</p> */}
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
  )
}
