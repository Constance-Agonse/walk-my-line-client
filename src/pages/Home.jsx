import React from 'react'
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div className="spacer blob-scene-haikei homeContainer">
    <h1 className="title">On va se faire kiffer comme jaja</h1>
    <h1 className="title">Bienvenue dans la home miss Agonsè</h1>
    <span className="circle"><p className="test">text test</p></span>
    <button className="buttonHome"> <NavLink exact to="/profile" className="linkHome">Profile</NavLink></button>
    <button className="buttonHome"> <NavLink exact to="/createSearchJourney" className="linkHome">Create a journeyyy !</NavLink></button>
    <button className="buttonHome"> <NavLink exact to="/signup" className="linkHome">Sign up !</NavLink></button>
    <button className="buttonHome"> <NavLink exact to="/signin" className="linkHome">Sign in !</NavLink></button>
    </div>
  )
}
