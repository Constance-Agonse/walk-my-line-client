import React, { useState } from 'react';
import { ArrowDropDown } from "@material-ui/icons";
import cx from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { Menu, MenuItem, Fade, Button } from '@mui/material';


import { useAuth } from "./../../auth/UserContext";
import { Logo } from "./Logo";

import "./Header.css";

export const Header = () => {
  const { currentUser } = useAuth();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
            style={{ backgroundImage: `url(${getAvatarUrl(currentUser?.profilePic)})` }}
          />
          <ArrowDropDown />
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
          <MenuItem>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  )
}

const getAvatarUrl = (url) => {
  return url ?? './profile1.png';
}