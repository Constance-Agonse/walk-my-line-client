import React, { useState, useContext } from "react";
import { styled } from '@mui/material/styles';

import { TextField, Button } from '@mui/material';


import { Link, Redirect } from "react-router-dom";

// custom tools
import { useAuth } from "./../auth/UserContext";
import APIHandler from "../api/APIHandler";

// import ToggleSignin from "../components/ToggleSignin"
import './../components/ToggleSignin.css'


import './Form.css';
import { Panel } from "../components/Panel/Panel";
// import { ToggleButtonGroup } from "@mui/material";


const MyButton = styled(Button)(({ theme }) => ({
  color: 'black',
  backgroundColor: 'white'
}));



export default function Signin(props) {
  const [email, setEmail] = useState("m@m.m");
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
      <svg className="Login__svg" width="283" height="318" viewBox="0 0 283 318" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M61.8672 46.4258L70.3477 0.0625H88.0195L72.3281 74H53.8438L43.9414 31.8516L34.2422 74H15.8086L0.0664062 0.0625H17.7891L26.2695 46.4258L36.4258 0.0625H51.5586L61.8672 46.4258Z" fill="black" />
        <path d="M134.738 60.1875H110.312L106.047 74H87.0039L114.121 0.0625H130.879L158.199 74H139.055L134.738 60.1875ZM114.578 46.4258H130.473L122.5 20.7812L114.578 46.4258Z" fill="black" />
        <path d="M181.457 60.2891H212.484V74H163.633V0.0625H181.457V60.2891Z" fill="black" />
        <path d="M245.137 46.4766L237.824 54.5V74H220V0.0625H237.824V32.6641L244.02 23.2695L259.965 0.0625H282.004L257.02 32.7656L282.004 74H260.879L245.137 46.4766Z" fill="black" />
        <path d="M27.9961 122.062L44.5 173.504L60.9531 122.062H84.4141V196H66.5391V178.734L68.2656 143.391L50.3906 196H38.6094L20.6836 143.34L22.4102 178.734V196H4.58594V122.062H27.9961Z" fill="black" />
        <path d="M121.434 154.156L135.043 122.062H154.289L130.473 169.441V196H112.395V169.441L88.6289 122.062H107.773L121.434 154.156Z" fill="black" />
        <path d="M22.4102 304.289H53.4375V318H4.58594V244.062H22.4102V304.289Z" fill="black" />
        <path d="M79.9453 318H62.1719V244.062H79.9453V318Z" fill="black" />
        <path d="M154.086 318H136.363L110.16 271.992V318H92.3359V244.062H110.16L136.312 290.07V244.062H154.086V318Z" fill="black" />
        <path d="M211.215 286.668H183.184V304.289H216.293V318H165.359V244.062H216.395V257.824H183.184V273.414H211.215V286.668Z" fill="black" />
      </svg>

      {/* <div className="toggle-signinup"> */}
      {/* <div className="switch-button">
          <span className="active">
            <button className="switch-button-case left active-case">Sign in</button>
            <button className="switch-button-case right">Sign up</button>
          </span>
        </div> */}
      {/* </div> */}
      <Panel className="form-container">
        <form onSubmit={handleSubmit} >
          <div className="form-block">
            {/* <label className="label" htmlFor="email">
            email
          </label>
          <input
            className="input"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /> */}
            <TextField
              id="email"
              type="email"
              value={email}
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
              variant="filled"
              fullWidth
            />
          </div>
          <div className="form-block">
            {/* <label className="label" htmlFor="password">
            password
          </label>
          <input
            className="input"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /> */}
            <TextField
              id="password"
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="filled"
              fullWidth
            />
          </div>
          <MyButton variant="contained" type="submit">
            Sign In
          </MyButton>
          <p className="parag">
            No account yet ? please{" "}
            <Link to="/auth/signup" className="link">
              signup
            </Link>
          </p>
        </form>
      </Panel>
    </div>
  )
}