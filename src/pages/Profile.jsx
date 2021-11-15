import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
// import MyLikedJournies from './MyLikedJournies';
// import MyOwnJournies from './MyOwnJournies';
import { Link } from 'react-router-dom';
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
  const [users, setUsers] = useState([]); // i need a state
  const [userId, setUserId] = useState(null); // so please react

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
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const currentUser = users.find((user) => user._id === userId);

  return (
    <div className="profile-global-container">
      <header className="profile-characteristic-container">
        <div className="container-profile-picture">
          <img className="imgProfile" src="./toutou.png" alt="your-profil-picture"/>
          <p id="user-name"><strong>Croustie</strong></p>
        </div>
          <div className="sub-container-profile-follower">
            <p className="profile-follower"><strong>5</strong> <br/> journies</p>
            <p className="profile-follower"><strong>10</strong> <br/> journies</p>
            <p className="profile-follower"><strong>30</strong> <br/> following</p>
            <p className="profile-follower"><strong>20</strong>  <br/> followers</p>
          </div>  
      </header>
      <section className="all-card-container">
      <div className="button-switch-container">
        <button className="button-switch"><Link className="switch-link" to="./journey"> My journies</Link></button>
        <button className="button-switch"><Link className="switch-link" to="./journey"> Liked journies </Link></button>
      </div>
        
        <JourneyCard/>
        <JourneyCard/>
        <JourneyCard/>
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
