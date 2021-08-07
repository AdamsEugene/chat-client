import React from "react";
import { useSelector } from "react-redux";
import * as timeago from "timeago.js";

import Popup from "../others/popup";

export default function Userinfor({ children }) {
  const currentUser = useSelector((state) => state.users.currentUser);
  const myData = useSelector((state) => state.users.myData);
  const currentGroup = useSelector((state) => state.groups.currentGroup);

  const status = ["actives", "away", "busy"];
  // const nodes = document.querySelectorAll(".needs-tobe-rendered");

  // use render method to render nodes in real time
  // timeago.render(nodes, "zh_CN");

  // cancel all real-time render task
  // timeago.cancel(); "https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png"
  return (
    <div className="userInfoX">
      <div className="homeLeftHeader">
        <h3 className="homeLeftText">
          {currentUser && Object.keys(currentUser).length !== 0 && `User Info`}
          {currentGroup &&
            Object.keys(currentGroup).length !== 0 &&
            `Group Info`}
        </h3>
        <img
          className="userDImg"
          src={
            currentUser &&
            Object.keys(currentUser).length !== 0 &&
            currentUser.profilePics.length !== 0
              ? `data:${currentUser.profilePics[0].contentType};base64,${currentUser.profilePics[0].image}`
              : currentGroup && currentGroup.groupPics
              ? `data:${currentGroup.groupPics.contentType};base64,${currentGroup.groupPics.image}`
              : "https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png"
          }
          alt="U"
        />
        <div className="userInfo">
          <div className="homeLeftUserCMC">
            <div className="lastSeen">
              {currentUser &&
                Object.keys(currentUser).length !== 0 &&
                `last Seen : ${timeago.format(currentUser.createdAt)}`}
              {currentGroup &&
                Object.keys(currentGroup).length !== 0 &&
                `Created at : ${timeago.format(currentGroup.createdAt)}`}
            </div>
            {currentUser && Object.keys(currentUser).length !== 0 ? (
              <Popup
                user={true}
                id={currentUser ? currentUser._id : ""}
                purpose=""
                block={
                  currentUser && myData.blockList.includes(currentUser._id)
                    ? "block"
                    : ""
                }
              />
            ) : (
              ""
            )}
          </div>
          <div className="homeLeftUserCMC">
            <div className="lastSeen">
              {currentUser &&
                Object.keys(currentUser).length !== 0 &&
                ` Status : ${status[currentUser && currentUser.status]}`}
            </div>
            {currentUser && myData.blockList.includes(currentUser._id) ? (
              <div className={`lastSeen block `}>blocked</div>
            ) : (
              ""
            )}
          </div>
          <div className="lastSeen">
            {currentUser &&
              Object.keys(currentUser).length !== 0 &&
              `Number: +233 900 300 3456`}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
