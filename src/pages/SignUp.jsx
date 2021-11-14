import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import './Form.css';
// custom tools
import APIHandler from "../api/APIHandler";
// import IconAvatarAdmin from "../components/icon/IconAvatarAdmin";
import { withAuth } from "../auth/UserContext";
// styles
// import "./../styles/form.css";
// import "./../styles/icon-avatar.css";

// class Signup extends Component {
//   state = {
//     avatar: "",
//     tmpAvatar: "",
//     username: "admin",
//     email: "admin@foobarbaz.io",
//     password: "12345",
//   };

//   handleSubmit = async (e) => {
//     e.preventDefault();

//     const fd = new FormData();
//     // create a form data (programatic form, to send the file as binary)
//     fd.append("email", this.state.email);
//     fd.append("password", this.state.password);
//     fd.append("username", this.state.username);
//     fd.append("avatar", this.state.avatar);

//     try {
//       await APIHandler.post("/signup", fd);
//       this.props.history.push("/signin");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   handleChange = (e) => {
//     this.setState({ [e.target.name]: e.target.value });
//   };

//   handleImage = (e) => {
//     // console.log("Signup@handle image", e.target.files[0]);
//     this.setState({ avatar: e.target.files[0] }, () => {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         // when the fileREader ends  ...
//         const baseString = reader.result; // get the image as a base64 encoded string
//         this.setState({ tmpAvatar: baseString }); // set the tmp avatar as an image source before upload
//       };
//       reader.readAsDataURL(this.state.avatar); // read the file from the local disk
//     });
//   };

//   render() {
//     console.log(this.props);
//     const { isLoggedIn } = this.props.userContext;
//     const { email, password, username, tmpAvatar } = this.state;
//     return isLoggedIn ? (
//       // avoid the component to be rendered if user is already logged in
//       <Redirect to="/dashboard" />
//     ) : (
//       <form
//         className="form"
//         onSubmit={this.handleSubmit}
//         onChange={this.handleChange}
//       >
//         <h1 className="title">Signup</h1>
//         <label className="label" htmlFor="email">
//           email
//         </label>
//         <input
//           className="input"
//           id="email"
//           type="email"
//           name="email"
//           defaultValue={email}
//         />
//         <label className="label" htmlFor="username">
//           username
//         </label>
//         <input
//           className="input"
//           id="username"
//           type="text"
//           name="username"
//           defaultValue={username}
//         />
//         <label className="label" htmlFor="avatar">
//           avatar
//         </label>
//         {/* <IconAvatarAdmin avatar={tmpAvatar} clbk={this.handleImage} /> */}
//         <label className="label" htmlFor="password">
//           password
//         </label>
//         <input
//           className="input"
//           id="password"
//           type="password"
//           name="password"
//           defaultValue={password}
//         />
//         <button className="btn">ok</button>
//         <p className="parag">
//           Already a member ? please{" "}
//           <Link to="/signin" className="link">
//             signin
//           </Link>
//         </p>
//       </form>
//     );
//   }
// }

// export default withAuth(Signup);



export default function SignUp() {
  return (
<div className="form-page">



<div className="toggle-signinup">
<p>Sign in</p>
<p>Sign up</p>
</div>
  <form
        className="form"
      >
    <div className="form-block">
      <label className="label" htmlFor="email">
          email
      </label>
      <input
          className="input"
          id="email"
          type="email"
          name="email"
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
        />
    </div>
    <div className="form-block">
      <label className="label" htmlFor="avatar">
          avatar
        </label>
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
        />
        </div>
        <button className="btn">ok</button>
        <p className="parag">
          Already a member ? please{" "}
          <Link to="/signin" className="link">
            signin
          </Link>
        </p>
      </form>
    </div>
  )
}