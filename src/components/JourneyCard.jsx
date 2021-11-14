import React from 'react'
import './JourneyCard.css';
import { useState } from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
// import {Favorite} from "@material-ui/icons"
import {Room} from "@material-ui/icons"
// import {Star} from "@material-ui/icons"

export default function JourneyCard() {
    const [viewport, setViewport] = useState({
    width: "20vw",
    height: "15vh",
    latitude: 48.853,
    longitude: 2.3905,
    zoom: 11.5
  });
    return (
        <section className="globalContainerJourneyCard">
            <div className="innerBoxContainer" >
                <h3 id="townName">Paris</h3>
                <ul>
                    <li>5 km</li>
                    <li>40 min</li>
                    <li>5 pins</li>
                    <li>Public</li>
                </ul>
            </div>

            <div className="innerBoxContainer">
                <p>arr (précision)</p>
                <p>France</p>
                <div className="tagContainer">
                    <span className="item">#Component</span>
                    <span className="item">#Component</span>
                    <span className="item">#Component</span>
                    <span className="item">#Component </span>
                    <span className="item">#Component</span>
                    <span className="item">...</span>

                </div>
            </div>
            
            <div className="innerBoxContainer map-container">
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken = "pk.eyJ1IjoiaHVnb3dhbGsiLCJhIjoiY2t2cjdnNmRnOG05cjJwcXd5bzdrcXNsMyJ9.V4USQMRev0gaQMP7zfrRlg"
                onViewportChange={nextViewport => setViewport(nextViewport)}
                mapStyle="mapbox://styles/hugowalk/ckvvj03ck2ojj14nmd442pqot"
                className="map"                
                >
                    <Marker 
                    latitude={48.853752} 
                    longitude={2.390568} 
                    offsetLeft={-20} 
                    offsetTop={-10}>
                        <Room style={{fontSize:viewport.zoom  * 3, color : '#fb8500'}}/>
                        {/* le zoom * 3 permet d'avoir un icon qui s'adapte avec le zoom effectué */}
                    </Marker>

            </ReactMapGL>
            </div>
        </section>
    )
}
