import React from "react";

import "../messages/chat.css";
import Taps from "../others/Taps";
import AllUsers from "../users/allUsers";
import Friends from "../users/friends";

export default function User() {
  return (
    <div className="homeLeft">
      <div className="homeLeftHeader">
        <Taps
          component="div"
          Users={<AllUsers />}
          user="All Users"
          Friends={<Friends />}
          friend="Friends"
        />
      </div>
    </div>
  );
}
