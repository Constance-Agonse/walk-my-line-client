import React from 'react';

import { Close } from "@material-ui/icons";

import "./Panel.css";

export const Panel = ({ children, onClose }) => {
  return (
    <div className="Panel">
      <button className="Panel__close" onClick={onClose}>
        <Close />
      </button>
      {children}
    </div>
  )
}