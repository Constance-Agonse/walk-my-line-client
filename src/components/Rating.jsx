import React from 'react';

export default function Rating(props) {
  return (
        <div>
            {"★".repeat(Math.round(Number(props.children))).padEnd(5, "☆")}
        </div>
    );
}
