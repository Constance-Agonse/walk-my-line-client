import React from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import APIHandler from "../../api/APIHandler";
import { useAuth } from "../../auth/UserContext";
// import "./../styles/IconSignOut.css"

export default withRouter(function IconSignout(props) {
  const { setCurrentUser } = useAuth();

  const handleSignout = () =>
    APIHandler.post("/signout").finally(() => {
      setCurrentUser(null);
    });

  return (
    <FontAwesomeIcon
      onClick={handleSignout}
      className="link icon-signout is-clickable"
      icon={faSignOutAlt}
      size="xs"
      title="signout"
    />
  );
});