import React, { useState } from 'react';
import { ArrowDropDown } from "@material-ui/icons";
import cx from 'classnames';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Menu, MenuItem, Button } from '@mui/material';

import { useAuth } from "./../../auth/UserContext";
import { Logo } from "./Logo";
import { getUserAvatarUrl } from '../../helpers/getUserAvatarUrl';
import APIHandler from "../../api/APIHandler";

import "./Header.css";

export const Header = () => {
  const { currentUser } = useAuth();
  const { setCurrentUser } = useAuth();
  const history = useHistory();

  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignout = () => {
    APIHandler.post("/signout").finally(() => {
      setCurrentUser(null);
      history.push('/auth/signin')
    });

  }
  const renderLinks = (menuItems) => {
    return menuItems.map((menuItem) => (
      <MenuItem onClick={handleClose}>
        <Link
          className={cx(
            'Header__profile__item',
            {
              "Header__profile__item--active": location.pathname === menuItem.path
            }
          )}
          to={menuItem.path}
        >
          {menuItem.name}
        </Link>
      </MenuItem>
    ))
  }

  const renderCallToActionButton = () => {
    if (currentUser && location.pathname !== '/createSearchJourney') {
      return (
        <Link className="Header__call-to-action" to='/createSearchJourney'>Create a journey</Link>
      )
    }

    if (!currentUser) {
      return (
        <Link className="Header__call-to-action" to='/auth/signin'>Sign in</Link>
      )
    }

    return null;
  }

  return (
    <div className="Header">
      <Logo className="Header__logo" />
      {renderCallToActionButton()}

      <div className="Header__profile">
        <Button
          id="basic-button"
          aria-controls="basic-menu"
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <div
            className="Header__profile__pic"
            style={{ backgroundImage: `url(${getUserAvatarUrl(currentUser?.profilePic)})` }}
          />
          <ArrowDropDown color="action" />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {renderLinks([
            {
              path: '/',
              name: 'All journeys',
            },
            {
              path: '/profile',
              name: 'My profile',
            },
            {
              path: '/createSearchJourney',
              name: 'Create a journey',
            },
          ])}
          <MenuItem onClick={handleSignout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  )
}