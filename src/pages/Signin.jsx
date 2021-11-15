import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";

// custom tools
import { useAuth } from "./../auth/UserContext";
import APIHandler from "../api/APIHandler";
// import "./../styles/form.css";


// export default function Signin(props) {
//   const [email, setEmail] = useState("admin@foobarbaz.io");
//   const [password, setPassword] = useState("12345");
//   const { isLoggedIn, setCurrentUser } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const apiRes = await APIHandler.post("/signin", { email, password });
//       setCurrentUser(apiRes.data.currentUser);
//     } catch (err) {
//       setCurrentUser(null);
//     }
//   };

//   return isLoggedIn ? (
//     <Redirect to="/" />
//   ) : (
//     <form className="form" onSubmit={handleSubmit}>
//       <h1 className="title">Signin</h1>
//       <label className="label" htmlFor="email">
//         email
//       </label>
//       <input
//         className="input"
//         id="email"
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <label className="label" htmlFor="password">
//         password
//       </label>
//       <input
//         className="input"
//         id="password"
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button className="btn">ok</button>
//       <p className="parag">
//         No account yet ? please{" "}
//         <Link to="/signup" className="link">
//           signup
//         </Link>
//       </p>
//     </form>
//   );
// }


///ONLY FOR STYLING // attention, reprendre cette  structure en haut (div)
import './Form.css';
// import { ToggleButtonGroup } from "@mui/material";


export default function Signin() {
  return (
    <div className="form-page">
      {/* <div className="toggle-signinup">
        <ToggleButtonGroup size="small" {...control}> */}
          {/* {children} */}
        {/* </ToggleButtonGroup>
        <ToggleButtonGroup {...control}>{children}</ToggleButtonGroup>
        <ToggleButtonGroup size="large" {...control}>
          {children}
        </ToggleButtonGroup> */}
      {/* </div> */}
      <form className="form" >
        <div className="form-block">
          <label className="label" htmlFor="email">
            email
          </label>
          <input
            className="input"
            id="email"
            type="email"
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
          />
        </div>
        <button className="btn">ok</button>
        <p className="parag">
          No account yet ? please{" "}
          <Link to="/signup" className="link">
            signup
          </Link>
        </p>
      </form>
    </div>
  )
}