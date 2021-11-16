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
        {/* <svg width="49" height="54" viewBox="0 0 49 54" fill="none">
          <path d="M2 19.5L24.5 2L47 19.5V47C47 48.3261 46.4732 49.5979 45.5355 50.5355C44.5979 51.4732 43.3261 52 42 52H7C5.67392 52 4.40215 51.4732 3.46447 50.5355C2.52678 49.5979 2 48.3261 2 47V19.5Z" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M17 52V27H32V52" stroke-linecap="round" stroke-linejoin="round" />
        </svg> */}
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

