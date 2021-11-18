import React from 'react';
import { NavLink } from "react-router-dom";
// auth
// import { useAuth } from "./../auth/UserContext";
import './NavBar.css'

export default function NavBar() {
  // const { isLoggedIn } = useAuth();
  const { isLoggedIn } = true;
  return (
    <nav id="nav_main" className="nav">
      <NavLink exact className="link" activeClassName="is-active" to="/profile">
        <img className="nav-img" src="toutou.png" alt="profile pic" />
      </NavLink>
      <NavLink exact className="link" activeClassName="is-active" to="/">
        <img className="nav-img" src="homeicon.png" alt="home icon" ></img>
      </NavLink>



      {isLoggedIn === false && (
        <>
          <NavLink className="link" activeClassName="is-active" to="/signup">
            signup
          </NavLink>
          <NavLink className="link" activeClassName="is-active" to="/signin">
            signin
          </NavLink>
        </>
      )}
      {isLoggedIn === true && (
        <NavLink className="link" activeClassName="is-active" to="/dashboard">
          dashboard
        </NavLink>
      )}
    </nav>
  );
}

