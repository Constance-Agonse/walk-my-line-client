import React, { useState } from 'react';

export default function Testbutton(props) {
  const [isActive, setActive] = useState(false);

const toggleClass = () => {
  setActive(!isActive);
};
  return (
    <div 
      className={isActive ? 'your_className': null} 
      onClick={toggleClass} 
    >
      <p>{props.text}</p>
    </div>
  )
}



// function MyComponent (props) {
//   const [isActive, setActive] = useState(false);

//   const toggleClass = () => {
//     setActive(!isActive);
//   };

//   return (
//     <div 
//       className={isActive ? 'your_className': null} 
//       onClick={toggleClass} 
//     >
//       <p>{props.text}</p>
//     </div>
//    );
// } 