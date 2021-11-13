import React from 'react';
import { NavLink } from "react-router-dom";
import MyLikedJournies from './MyLikedJournies';
import MyOwnJournies from './MyOwnJournies';
import { Link } from 'react-router-dom';
import JourneyCard from "../components/JourneyCard";

export default function Profile() {
  return (
    <div className="profile-global-container">
      <header className="profile-characteristic-container">
        <div className="container-profile-picture">
          <img className="imgProfile" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9wKnk1Ujhvlixhd2iznESeyHmDGBjEFJaBg&usqp=CAU"/>
          <p className="user-name">Croustie</p>
        </div>
        <div className="container-profile-follower">
          <p className="profile-follower">5 journies</p>
          <p className="profile-follower">20 journies</p>
          <p className="profile-follower">30 following</p>
          <p className="profile-follower">20 followers</p>
        </div>
      </header>
      <section className="card">
        <div>infos du profile</div>
        <JourneyCard/>

            <MyLikedJournies />  OR
            <MyOwnJournies />
            <div>
              <NavLink to="/">Home</NavLink>
              <NavLink to="./createSearchJourney">Create a journey</NavLink>
            </div>
      </section>
      
    </div>
  )
}
