import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

import "./Callout.css";

export const Callout = ({ text, buttonText, link, onButtonClick }) => {
  return (
    <div className="Callout">
      <p className="Callout__text">
        {text}
      </p>
      {link && (
        <div className="Callout__actions">
          <Link to={link}>
            <Button variant="outlined">
              {buttonText}
            </Button>
          </Link>
        </div>
      )}
      {onButtonClick && (
        <div className="Callout__actions">
          <Button variant="outlined" onClick={onButtonClick}>
            {buttonText}
          </Button>
        </div>
      )}
    </div>
  )
}