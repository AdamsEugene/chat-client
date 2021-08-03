import React, { useEffect, useState } from "react";
import { css } from "@emotion/css";
import { useDispatch, useSelector } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom";

import { userFriends, currentUser, allFriends } from "../../redux/actions";

const ROOT_CSS = css({
  height: "69vh",
  // width: "100%",
  // backgroundColor: "rgba(255, 255, 255, 0.05)",
});

export default function Friends() {
  const dispatch = useDispatch();
  const myData = useSelector((state) => state.users.myData);
  const friends = useSelector((state) => state.users.friends);

  const [activeUser, setActiveUser] = useState();

  useEffect(() => {
    if (Object.keys(myData).length !== 0 && !friends)
      dispatch(userFriends(myData.accessToken));
  }, [dispatch, myData, friends]);

  useEffect(() => {
    dispatch(allFriends());
  }, [dispatch]);

  const setActive = (id) => {
    setActiveUser(id);
    dispatch(currentUser(id));
  };

  const status = ["actives", "away", "busy"];

  return (
    <div>
      <h3 className="homeLeftText">Friends</h3>
      <ScrollToBottom className={ROOT_CSS} mode="top">
        {friends ? (
          friends.map((friend, i) => (
            <div
              key={i}
              className={`homeLeftUserList ${
                myData.blockList.includes(friend._id) ? "block" : ""
              }  ${activeUser === friend._id ? "active" : ""}  `}
              onClick={() => setActive(friend._id)}
            >
              <img
                className="homeLeftUserAvatal"
                src={
                  friend.profilePics.length !== 0
                    ? `data:${friend.profilePics[0].contentType};base64,${friend.profilePics[0].image}`
                    : "https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png"
                }
                alt="N"
              />
              <div className="homeLeftUserDetails">
                <div className="homeLeftUser">
                  <div className="homeLeftUserName">{friend.name}</div>
                  <div className="homeLeftUserStatus">
                    <span className="number">3</span>
                  </div>
                </div>
                <div className="homeLeftUserCMC">
                  <div className="homeLeftUserCM">current message</div>
                  <div className={`states ${status[friend.status]}`}></div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h5 className="homeLeftText" style={{ textAlign: "center" }}>
            Click on all users and add friends
          </h5>
        )}
      </ScrollToBottom>
      <input
        className="homeLeftInput"
        type="text"
        placeholder="Search for friend"
      />
    </div>
  );
}
