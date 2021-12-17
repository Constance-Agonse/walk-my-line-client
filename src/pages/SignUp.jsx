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
import { Panel } from "../components/Panel/Panel";

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
      <svg className="signinup-walkmyline-title" width="237" height="234" viewBox="0 0 237 234" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M59.3494 1.82661L53.3205 36.0698L45.9843 1.79072L45.8151 1H45.0065H32.6614H31.8502L31.6829 1.79369L24.4644 36.0288L18.4427 1.82661L18.2972 1H17.4579H3H1.77428L2.02036 2.20076L14.8626 64.8654L15.0264 65.6647H15.8422H30.88H31.6828L31.8564 64.8809L38.8026 33.5208L45.8953 64.8852L46.0716 65.6647H46.8707H61.9499H62.7663L62.9297 64.8648L75.7305 2.20014L75.9756 1H74.7507H60.3343H59.495L59.3494 1.82661ZM89.4571 65.6647H90.2031L90.4157 64.9496L93.683 53.9581H112.12L115.427 64.9527L115.641 65.6647H116.384H132.002H133.419L132.944 64.3296L110.657 1.6649L110.42 1H109.715H96.044H95.3365L95.101 1.66712L72.9792 64.3318L72.5087 65.6647H73.9222H89.4571ZM177.287 53.0442V52.0442H176.287H151.976V2V1H150.976H136.435H135.435V2V64.6647V65.6647H136.435H176.287H177.287V64.6647V53.0442ZM197.959 26.1896V2V1H196.959H182.418H181.418V2V64.6647V65.6647H182.418H196.959H197.959V64.6647V48.5142L202.736 43.0688L214.891 65.1469L215.176 65.6647H215.767H233H234.741L233.864 64.1609L213.813 29.7805L233.806 2.59242L234.977 1H233H215.021H214.483L214.187 1.44837L201.179 21.1172L201.174 21.125L201.169 21.1329L197.959 26.1896ZM33.1289 85.3726L32.9113 84.6677H32.1735H13.0758H12.0758V85.6677V148.332V149.332H13.0758H27.6166H28.6166V148.332V133.699V133.676L28.6155 133.652L27.5526 111.016L39.8813 148.644L40.107 149.332H40.8316H50.4426H51.1676L51.393 148.643L63.6788 111.076L62.6173 133.652L62.6162 133.676V133.699V148.332V149.332H63.6162H78.1983H79.1983V148.332V85.6677V84.6677H78.1983H59.0593H58.3208L58.1035 85.3734L45.6356 125.872L33.1289 85.3726ZM108.397 110.226L98.1799 85.2886L97.9255 84.6677H97.2545H81.6367H80.0435L80.7362 86.1025L100.024 126.052V148.332V149.332H101.024H115.772H116.772V148.332V126.052L136.101 86.1032L136.796 84.6677H135.201H119.501H118.829L118.575 85.2898L108.397 110.226ZM53.9282 220.38V219.38H52.9282H28.6166V169.335V168.335H27.6166H13.0758H12.0758V169.335V232V233H13.0758H52.9282H53.9282V232V220.38ZM74.5528 233H75.5528V232V169.335V168.335H74.5528H60.0535H59.0535V169.335V232V233H60.0535H74.5528ZM135.036 233H136.036V232V169.335V168.335H135.036H120.536H119.536V169.335V204.418L100.079 168.855L99.7943 168.335H99.2016H84.6609H83.6609V169.335V232V233H84.6609H99.2016H100.202V232V196.911L119.701 232.481L119.985 233H120.578H135.036ZM181.64 206.445H182.64V205.445V194.212V193.212H181.64H159.773V181.999H185.866H186.866V180.999V169.335V168.335H185.866H144.232H143.232V169.335V232V233H144.232H185.783H186.783V232V220.38V219.38H185.783H159.773V206.445H181.64ZM102.882 23.0583L108.04 40.2945H97.7574L102.882 23.0583Z" fill="#EBE0CA" stroke="#68917B" stroke-width="2" />
      </svg>
      <Panel className="form-container">
        <form
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


          <MyButton variant="contained" type="submit">Sign up</MyButton>
          <p className="parag">
            Already a member ? please{" "}
            <Link to="/auth/signin" className="link">
              signin
            </Link>
          </p>
        </form>
      </Panel>
    </div>
    );
  }
}

export default withAuth(Signup);
