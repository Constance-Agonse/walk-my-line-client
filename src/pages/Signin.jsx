import React, { useState, useContext } from "react";


import { Link, Redirect } from "react-router-dom";

// custom tools
import { useAuth } from "./../auth/UserContext";
import APIHandler from "../api/APIHandler";

// import ToggleSignin from "../components/ToggleSignin"
import './../components/ToggleSignin.css'


import './Form.css';
// import { ToggleButtonGroup } from "@mui/material";


export default function Signin(props) {
  const [email, setEmail] = useState("admin@foobarbaz.io");
  const [password, setPassword] = useState("12345");
  const { isLoggedIn, setCurrentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiRes = await APIHandler.post("/auth/signin", { email, password });
      setCurrentUser(apiRes.data.currentUser);
    } catch (err) {
      setCurrentUser(null);
    }
  };

  return isLoggedIn ? (
    <Redirect to="/" />
  ) : (
    <div className="form-page-container-signinup">
    <h1 className="form-title-app" >Walk My Line</h1>
      {/* <div className="toggle-signinup"> */}
        {/* <div className="switch-button">
          <span className="active">
            <button className="switch-button-case left active-case">Sign in</button>
            <button className="switch-button-case right">Sign up</button>
          </span>
        </div> */}
      {/* </div> */}
      <form className="form-container" onSubmit={handleSubmit} >
        <div className="form-block">
          <label className="label" htmlFor="email">
            email
          </label>
          <input
            className="input"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-block">
          <label className="label" htmlFor="password">
            password
          </label>
          <input
            className="input"
            id="password"
            type="password"
            value={password}
        onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn">ok</button>
        <p className="parag">
          No account yet ? please{" "}
          <Link to="/auth/signup" className="link">
            signup
          </Link>
        </p>
      </form>
    </div>
  )
}