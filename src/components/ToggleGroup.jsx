import React, { useState } from "react";
import './../pages/Form.css'
import { NavLink } from "react-router-dom";

const types = ["Sign in", "Sign up"];

export default function ToggleGroup() {
  const [active, setActive] = useState(types[0]);
  return (
    <div>
      {types.map((type) => (
        <button active={active === type} onClick={() => setActive(type)}>
          <NavLink to="/"
          {type}
        </button>
      ))}
    </div>
  );
}



