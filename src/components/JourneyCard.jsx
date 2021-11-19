import React from 'react'
import './JourneyCard.css';
import { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
// import {Favorite} from "@material-ui/icons"
import { Room } from "@material-ui/icons"
// import {Star} from "@material-ui/icons"
import Hashtags from "./Hashtags"
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { useAuth } from "./../auth/UserContext";


export default function JourneyCard({ journeyData, handleDelete}) {
  const { currentUser } = useAuth();

    const [viewport, setViewport] = useState({
        width: "115px",
        height: "115px",
        latitude: journeyData.latInitial,
        longitude: journeyData.longInitial,
        zoom: 11.5
    });
    return (
        <section className="globalContainerJourneyCard">
            <div className="map-container">
                <ReactMapGL
                    {...viewport}
                    mapboxApiAccessToken="pk.eyJ1IjoiaHVnb3dhbGsiLCJhIjoiY2t2cjdnNmRnOG05cjJwcXd5bzdrcXNsMyJ9.V4USQMRev0gaQMP7zfrRlg"
                    onViewportChange={nextViewport => setViewport(nextViewport)}
                    mapStyle="mapbox://styles/hugowalk/ckvvj03ck2ojj14nmd442pqot"
                    className="map"
                >
                    <Marker
                        latitude={journeyData.latInitial}
                        longitude={journeyData.longInitial}
                        offsetLeft={-20}
                        offsetTop={-10}>
                        <Room style={{ fontSize: viewport.zoom * 3, color: '#fb8500' }} />
                        {/* le zoom * 3 permet d'avoir un icon qui s'adapte avec le zoom effectué */}
                    </Marker>

                </ReactMapGL>
            </div>
            <Link className="innerBoxContainer-link" to={{
                pathname: '/journey',
                state: {
                    journeyData: journeyData,
                }
            }}>
                <div className="innerBoxContainer-journey" >

                    <p>{journeyData.title}</p>
                    <p>by {journeyData.creator.username}</p>
                    <div className="affichage-vertical">
                        <h3 id="townName">Paris</h3>
                        <p>France</p>
                    </div>
                    <div className="affichage-vertical">
                        <p>{journeyData.km} km</p>
                        <p>{journeyData.journeyTime} min</p>
                        <p>{journeyData.pins.length} pins</p>
                    </div>
                    <div className="affichage-vertical">
                        <p>{(journeyData.isPublic) ? ("Public") : "Private"}</p>
                        <Rating>{journeyData.rate}</Rating>
                    </div>
                    <div className="tagContainer">
                        {journeyData.tags.map((tag, i) => {
                            return <Hashtags key={i} text={tag} />
                        }
                        )}
                        <span className="item-hashtags">...</span>
                    </div>


                </div>
            </Link>

            <button className="deletebtn" onClick={() => handleDelete(journeyData._id)}><img src="/delete.png" alt="deletebtn" id="deleteimg" /></button>


        </section>
    )
}
