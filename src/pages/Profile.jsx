import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
// import MyLikedJournies from './MyLikedJournies';
// import MyOwnJournies from './MyOwnJournies';
// import { Link } from 'react-router-dom';
import JourneyCard from "../components/JourneyCard";
import './Profil.css';
import {HomeRounded} from "@material-ui/icons";
import {EditLocationOutlined} from "@material-ui/icons";
import APIHandler from "./../api/APIHandler";


//LE Profile va être render avec les informations que possède le user.
// 1 - Trouver comment on avait fait avec le précédent projet pour connecter un mec par default
// 2 - Comparer comment on fait passer les paramètres
// 3 - Ecrire les parametres et les faires passer dans JourneyCard
// 4 - Agencer les différentes informations en fonction de ce qui doit être display


export default function Profile() {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState([]); 
  const [journiesCreateByUser, setJourniesCreateByUser] = useState([]); 
  const [journiesFollowedByUser, setJourniesFollowedByUser] = useState([]); 
  const [btnMyJourniesOn,setBtnMyJourniesOn] = useState(true);



  useEffect(() => {
    console.log("MOUNTED !!!!");
    console.log("in effect => same as component did mount");
    // when the component is attached to the DOM => fetchCats
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await APIHandler.get("/profile");
      console.log("api res => ", res);
      setUsers(res.data[0]); //(prevUsers) => prevUsers = 
      setUserId(res.data[1]); //(prevUserId) => prevUserId = 
      setJourniesCreateByUser(res.data[2]);
      setJourniesFollowedByUser(res.data[3]);
    } catch (err) {
      console.error(err);
    }
  };
  console.log("users >>> ", users)
  // console.log("userId >>> ", userId)
  console.log("journiesCreateByUser >>> ", journiesCreateByUser) //[0].creator.username
  console.log("journiesFollowedByUser >>> ", journiesFollowedByUser)

{/* <Link className="switch-link" to="./journey"> Liked journies </Link> */}

  return (
    <div className="profile-global-container">
      <header className="profile-characteristic-container">
        <div className="container-profile-picture">
          <img className="imgProfile" src="./toutou.png" alt="beautifulAvatarOfu"/>
          <p id="user-name"><strong>{userId.username}</strong></p> 
        </div>
          <div className="sub-container-profile-follower">
            <p className="profile-follower"><strong>{journiesCreateByUser.length}</strong> <br/> journies</p>
            <p className="profile-follower"><strong>{journiesFollowedByUser.length}</strong> <br/> journies liked</p>
          </div>  
      </header>
      <section className="all-card-container">
      <div className="button-switch-container">
        <button className="button-switch" onClick={() => setBtnMyJourniesOn(prev => prev = true)}>My journies</button> 
        <button className="button-switch" onClick={() => setBtnMyJourniesOn(prev => prev = false)}>Liked journies</button>
      </div>
        {btnMyJourniesOn ? (
          // MY JOURNIES
            journiesCreateByUser.length === 0 ? (
              <h2>No journies created yet ...</h2>
            ) : (
              journiesCreateByUser.map((journey) => (
                <JourneyCard key={journey._id} journeyData={journey}/>
              ))
            )

        ) : ( // MY LIKED JOURNIES
          journiesFollowedByUser.length === 0 ? (
            <h2>No liked journies yet ...</h2>            
          ) : (
            journiesFollowedByUser.map((journey) => (
                <JourneyCard key={journey._id} journeyData={journey}/>
              ))
          )
        )
        }

      </section>   
      <footer className="nav-container">
        <div className="spacer wave-bottom"></div>
        <div className="nav-icone-container">
          <NavLink to="/"><HomeRounded className="icone" /></NavLink>
          <NavLink to="./createSearchJourney"><EditLocationOutlined className="icone"/></NavLink>
        </div>
      </footer>   
    </div>
  )
}
