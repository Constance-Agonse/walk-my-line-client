import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

export default function IconAvatar({ clbk, avatar= ""}) {
  const fileInput = React.createRef();

  const handleClick = () => {
    console.log(fileInput.current)
    fileInput.current.click();
  };

  return (
    <div className={"is-clickable icon-avatar"} title="change avatar">
      {avatar && <img src={avatar} alt="user avatar" />}
      <input
        ref={fileInput}
        type="file"
        name='avatar'
        className="is-hidden"
        onChange={clbk}
      />
      <FontAwesomeIcon
        onClick={handleClick}
        className="is-clickable fa-lg"
        icon={faCamera}
      />
    </div>
  );
}