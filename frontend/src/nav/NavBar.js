import "./NavBar.scss"
import bell from "../images/bell.png"
import defaultAvatar from "../images/default-avatar.jpeg"
import React from "react";
import LoginButton from "../user/login-button";
import LogoutButton from "../user/logout-button";

function NavBar(props) {
  return (
    <div className="NavBar">
      <ul className="items">
        <li className="notification-bell"><img src={bell} alt="bell" width="80" height="80"/></li>
        <li className="default-avatar"><img src={defaultAvatar} alt="default-avatar" width="80" height="80"/></li>
        <li><p className="user-full-name">{`${props.firstName} ${props.lastName}`}</p></li>
        <li><LogoutButton/></li>
      </ul>
    </div>
  );
}

function UnauthenticatedNavBar() {
  return (
    <div className="NavBar">
      <ul className="items">
        <li><p className="about-link">About</p> </li>
        <li><LoginButton/></li>
      </ul>
    </div>
  )
}

export {NavBar, UnauthenticatedNavBar};