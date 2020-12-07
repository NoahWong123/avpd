import "./NavBar.scss"
import bell from "./bell.png"
import defaultAvatar from "./default-avatar.jpeg"
import React from "react";

function NavBar() {
  return (
    <div className="NavBar">
      <ul className="items">
        <li className="notification-bell"><img src={bell} alt="bell" width="80" height="80"/></li>
        <li className="default-avatar"><img src={defaultAvatar} alt="default-avatar" width="80" height="80"/></li>
        <li><p className="user-full-name">Steve Beve</p></li>
      </ul>
    </div>
  );
}

export default NavBar;