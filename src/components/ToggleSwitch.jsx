import React, { Component } from 'react';
import './ToggleSwitch.css';
import { Link } from 'react-router-dom';

class ToggleSwitch extends Component {
  render() {
    return (
      <div className="toggle-switch">
        <input
          type="checkbox"
          className="toggle-switch-checkbox"
          name={this.props.Name}
          id={this.props.Name}
        />
        <label className="toggle-switch-label" htmlFor={this.props.Name}>

          <span className="toggle-switch-inner" data-yes="Sign in" data-no="Sign up" >
            <Link to="auth/signin" />
          </span>


          <span className="toggle-switch-switch">
          <Link to="auth/signup" />
        </span>

      </label>
      </div >
    );
  }
}

export default ToggleSwitch;

