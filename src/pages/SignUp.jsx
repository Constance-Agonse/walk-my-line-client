import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import './Form.css';
// custom tools
import APIHandler from "../api/APIHandler";
import IconAvatarAdmin from "../components/icon/IconAvatarAdmin";
import { withAuth } from "../auth/UserContext";
// styles
import ToggleSwitch from '../components/ToggleSwitch';

// import "./../styles/icon-avatar.css";

const MyButton = styled(Button)(({ theme }) => ({
  color: 'black',
  backgroundColor: 'white',
  marginBottom: "16px"
}));


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


      <form
        className="form-container"
        onSubmit={this.handleSubmit}>
        <div className="form-block">

          <TextField
            fullWidth
            className="TextField__input"
            id="email"
            label="Email"
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-block">

          <TextField
            fullWidth
            className="TextField__input"
            id="username"
            label="Username"
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-block">
        
          <IconAvatarAdmin profilePic={tmpAvatar} clbk={this.handleImage} />



        </div>
        <div className="form-block">
          <TextField
            fullWidth
            className="TextField__input"
            id="password"
            label="Password"
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </div>
        <MyButton type="submit" className="btn">Sign up</MyButton>
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
