import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import './Form.css';
// custom tools
import APIHandler from "../api/APIHandler";
import IconAvatarAdmin from "../components/icon/IconAvatarAdmin";
import { withAuth } from "../auth/UserContext";
// styles
import ToggleSwitch from '../components/ToggleSwitch';

// import "./../styles/icon-avatar.css";

class Signup extends Component {
  state = {
    profilePic: React.createRef(),
    tmpAvatar: "",
    username: "admin",
    email: "admin@foobarbaz.io",
    password: "12345",
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, username } = this.state;
// const file = this.state
    console.log(this.state.profilePic);
    // const file = this.state.profilePic
    const fd = new FormData();
    // create a form data (programatic form, to send the file as binary)
    fd.append("email", email);
    fd.append("password", password);
    fd.append("username", username);
    fd.append("profilePic", this.state.profilePic);

    try {
      await APIHandler.post("/auth/signup", fd);
      this.props.history.push("/auth/signin");
    } catch (err) {
      console.error(err);
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleImage = (e) => {
    // console.log("Signup@handle image", e.target.files[0]);
    this.setState({ profilePic: e.target.files[0] }, () => {
      const reader = new FileReader();
      reader.onloadend = () => {
        // when the fileREader ends  ...
        const baseString = reader.result; // get the image as a base64 encoded string
        this.setState({ tmpAvatar: baseString }); // set the tmp avatar as an image source before upload
      };
      reader.readAsDataURL(this.state.profilePic); // read the file from the local disk
    });
  };

  render() {
    console.log(this.props);
    //const { isLoggedIn } = this.props.userContext;
    const { 
      // email, password, username, 
      tmpAvatar } = this.state;
    //return isLoggedIn ? (
    // avoid the component to be rendered if user is already logged in
    // <Redirect to="/" />
    //) : (
    return (<div className="form-page-container-signinup">

<h1 className="form-title-app" >Walk My Line</h1>

      {/* <div className="toggle-signinup">
       <ToggleSwitch Name='weekly' />
      </div> */}
      <form
        className="form-container"
        onSubmit={this.handleSubmit}>
        <div className="form-block">
          <label className="label" htmlFor="email">
            email
          </label>
          <input
            className="input"
            id="email"
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-block">
          <label className="label" htmlFor="username">
            username
          </label>
          <input
            className="input"
            id="username"
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-block">
          <label className="label" htmlFor="profilePic">
            avatar
          </label>

          <IconAvatarAdmin profilePic={tmpAvatar} clbk={this.handleImage} />



        </div>
        {/* <IconAvatarAdmin avatar={tmpAvatar} clbk={this.handleImage} /> */}
        <div className="form-block">
          <label className="label" htmlFor="password">
            password
          </label>

          <input
            className="input"
            id="password"
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </div>
        <button className="btn">ok</button>
        <p className="parag">
          Already a member ? please{" "}
          <Link to="/auth/signin" className="link">
            signin
          </Link>
        </p>
      </form>
    </div>
    );
  }
}

export default withAuth(Signup);



// export default function SignUp() {
//   return (
// <div className="form-page">



// <div className="toggle-signinup">
// <p>Sign in</p>
// <p>Sign up</p>
// </div>
//   <form
//         className="form"
//       >
//     <div className="form-block">
//       <label className="label" htmlFor="email">
//           email
//       </label>
//       <input
//           className="input"
//           id="email"
//           type="email"
//           name="email"
//         />
//     </div>
//     <div className="form-block">
//       <label className="label" htmlFor="username">
//           username
//       </label>
//       <input
//           className="input"
//           id="username"
//           type="text"
//           name="username"
//         />
//     </div>
//     <div className="form-block">
//       <label className="label" htmlFor="avatar">
//           avatar
//         </label>
//         </div>
//         {/* <IconAvatarAdmin avatar={tmpAvatar} clbk={this.handleImage} /> */}
//         <div className="form-block">
//         <label className="label" htmlFor="password">
//           password
//         </label>

//         <input
//           className="input"
//           id="password"
//           type="password"
//           name="password"
//         />
//         </div>
//         <button className="btn">ok</button>
//         <p className="parag">
//           Already a member ? please{" "}
//           <Link to="/signin" className="link">
//             signin
//           </Link>
//         </p>
//       </form>
//     </div>
//   )
// }