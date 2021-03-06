import React from 'react';

import { Close } from "@material-ui/icons";

import "./Panel.css";

export const PanelCool = ({ children, onClose }) => {
  return (
    <div className="PanelCool">
      <svg width="375" height="139" viewBox="0 0 375 139" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M422 67.8113L405.767 57.4359C389.533 47.1363 357.067 26.3855 324.6 14.0411C292.133 1.69666 259.667 -2.39291 227.2 1.31799C194.733 4.95316 162.267 16.3131 129.8 28.5818C97.3333 40.7747 64.8667 53.9522 32.4 53.0434C-0.0666671 52.1346 -32.5333 37.291 -48.7667 29.7935L-65 22.3717V139H-48.7667C-32.5333 139 -0.0666671 139 32.4 139C64.8667 139 97.3333 139 129.8 139C162.267 139 194.733 139 227.2 139C259.667 139 292.133 139 324.6 139C357.067 139 389.533 139 405.767 139H422V67.8113Z" fill="#095256" />
      </svg>
      {onClose && (
        <button className="Panel__close" onClick={onClose}>
          <Close />
        </button>
      )}
      {children}
    </div>
  )
}