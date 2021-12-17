import React from 'react';
import cx from 'classnames';

import "./Panel.css";

export const Panel = ({ className, children, isHidable }) => {

  return (
    <div className={cx("Panel", className)}>
      {isHidable && (
        <div className="Panel__grip" />
      )}
      {children}
    </div>
  )
}
