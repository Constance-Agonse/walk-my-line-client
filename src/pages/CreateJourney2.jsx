import React, { useState } from 'react'
import { NavLink , Link} from "react-router-dom";
import ReactDOM from "react-dom";
import ReactMapboxGl from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
// import './CreateSearchJourney.css';


import {HomeRounded} from "@material-ui/icons";
import {PersonRounded} from '@material-ui/icons';

const Map = ReactMapboxGl({
    accessToken:
        "pk.eyJ1IjoiaHVnb3dhbGsiLCJhIjoiY2t2cjdnNmRnOG05cjJwcXd5bzdrcXNsMyJ9.V4USQMRev0gaQMP7zfrRlg"
    });
    
export default function CreateJourney2({location}) {
  const [isPublic, setIsPublic] = useState(true);

    console.log(location)
    const cityData = location.state;
    
    const onDrawCreate = ({ features }) => {
        console.log(features);
    };

    const onDrawUpdate = ({ features }) => {
        console.log(features);
    };

    return (
        
        <div> 
            <div id="test">
                    <Map
                        // mapboxApiAccessToken = "pk.eyJ1IjoiaHVnb3dhbGsiLCJhIjoiY2t2cjdnNmRnOG05cjJwcXd5bzdrcXNsMyJ9.V4USQMRev0gaQMP7zfrRlg"
                        style="mapbox://styles/hugowalk/ckvyzg1n629ta15mvc49rx7ll"
                        containerStyle={{
                        height: "75vh",
                        width: "100vw"
                        }}
                        center= {[cityData.longitude,cityData.latitude]}
                        zoom= {[cityData.zoom]}
                    >
                        <DrawControl onDrawCreate={onDrawCreate} onDrawUpdate={onDrawUpdate} id="drawcontrol"/>
                    </Map>
            </div>

            <section id="menu">
                <div className="nav-icone-container">
                <NavLink to="/"><HomeRounded className="icone" /></NavLink>
                <NavLink to="/profile"><PersonRounded className="icone"/></NavLink>
                </div>
                <div id="pins-container">
                <button>A</button>
                <button>V</button>
                <button>I</button>
                <button>T</button>
                </div>
                <div id="feature-container">
                <form action="">
                    <label htmlFor=""></label>
                    <input type="text" />
                </form>
                <button>#addATag</button>
                <button>Done !</button>
                <button onClick={() => setIsPublic(prev => prev = !prev)}>{isPublic ? ("Public"): "Private"}</button>
                </div>
            </section>

        </div>
    )
}
