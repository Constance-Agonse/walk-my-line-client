import React from 'react'
import './JourneyCard.css';
import { useState } from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
// import {Favorite} from "@material-ui/icons"
import {Room} from "@material-ui/icons"
// import {Star} from "@material-ui/icons"
import Hashtags from "./Hashtags"
import { Link } from 'react-router-dom';


export default function JourneyCard({ journeyData }) {
    const [viewport, setViewport] = useState({
    width: "20vw",
    height: "15vh",
    latitude: journeyData.latInitial,
    longitude: journeyData.longInitial,
    zoom: 11.5
  });
    return (
        <section className="globalContainerJourneyCard">
            <Link to={{
                pathname:'/journey',
                state: journeyData
            }}>
                <div className="innerBoxContainer" >
                    <h3 id="townName">Paris</h3>
                    <ul>
                        <li>{journeyData.km} km</li>
                        <li>{journeyData.journeyTime} min</li>
                        <li>{journeyData.pins.length} pins</li>
                        <li>{(journeyData.isPublic) ? ("Public"): "Private"}</li>
                    </ul>
                </div>
            </Link>    
            <div className="innerBoxContainer">
                <p>arr (précision)</p>
                <p>France</p>
                <div className="tagContainer">
                    {journeyData.tags.map((tag) => {
                        return <Hashtags key={tag._id} text={tag} />
                    } 
                    )}
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
                    latitude={journeyData.latInitial} 
                    longitude={journeyData.longInitial} 
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
