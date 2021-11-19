import React from 'react'
import { NavLink } from "react-router-dom";
import './Home.css';


export default function Home() {
  return (
    <div className="spacer blob-scene-haikei homeContainer">
    <h1 className="title-other">Walk My Line</h1>
    <button className="buttonHome"> <NavLink exact to="/profile" className="linkHome">Profile</NavLink></button>
    <button className="buttonHome"> <NavLink exact to="/createSearchJourney" className="linkHome">Create a journeyyy !</NavLink></button>
    <button className="buttonHome"> <NavLink exact to="/auth/signup" className="linkHome">Sign up !</NavLink></button>
    <button className="buttonHome"> <NavLink exact to="/auth/signin" className="linkHome">Sign in !</NavLink></button>
    <button className="buttonHome"> <NavLink exact to="/homeSearch" className="linkHome">/homeSearch</NavLink></button>
    </div>
  )
}
