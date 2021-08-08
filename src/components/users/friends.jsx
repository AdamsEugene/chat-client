import React, { useEffect, useState } from "react";
import { css } from "@emotion/css";
import { useDispatch, useSelector } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom";

import {
  userFriends,
  currentUser,
  allFriends,
  searchForFriend,
  currentGroup,
} from "../../redux/actions";

const ROOT_CSS = css({
  height: "69vh",
  // width: "100%",
  // backgroundColor: "rgba(255, 255, 255, 0.05)",
});

export default function Friends() {
  const dispatch = useDispatch();
  const myData = useSelector((state) => state.users.myData);
  const friends = useSelector((state) => state.users.friends);
  const activeUsers = useSelector((state) => state.users.activeUsers);
  const searchFriends = useSelector((state) => state.users.searchFriends);
  const socket = useSelector((state) => state.settings.socket);

  const [activeUser, setActiveUser] = useState();
  const [name, setName] = useState("");
  const [typing, setTyping] = useState([]);

  useEffect(() => {
    if (Object.keys(myData).length !== 0 && (!friends || friends.length === 0))
      dispatch(userFriends(myData.accessToken));
  }, [dispatch, myData, friends]);

  useEffect(() => {
    dispatch(allFriends());
  }, [dispatch]);

  const setActive = (id) => {
    setActiveUser(id);
    dispatch(currentUser(id));
    dispatch(currentGroup(45));
  };

  const status = ["actives", "away", "busy"];

  const handleSubmit = (e) => setName("");

  useEffect(() => {
    dispatch(searchForFriend(name));
  }, [name, dispatch]);

  useEffect(() => {
    socket?.on("some one typing", (typing) => {
      setTyping(typing);
    });
  });

  return (
    <div>
      <h3 className="homeLeftText">Friends</h3>
      <ScrollToBottom className={ROOT_CSS} mode="top">
        {searchFriends && searchFriends?.length !== 0 && name !== "" ? (
          searchFriends.map((friend, i) => (
            <div
              key={i}
              className={`homeLeftUserList ${
                myData.blockList.includes(friend._id) ? "block" : ""
              }  ${activeUser === friend._id ? "active" : ""}  `}
              onClick={() => setActive(friend._id)}
            >
              <div
                className={`${
                  activeUsers && activeUsers.includes(friend._id)
                    ? "online"
                    : "offline"
                }  `}
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
              </div>
              <div className="homeLeftUserDetails">
                <div className="homeLeftUser">
                  <div className="homeLeftUserName">{friend.name}</div>
                  <div className="homeLeftUserStatus">
                    <span className="number">3</span>
                  </div>
                </div>
                <div className="homeLeftUserCMC">
                  <div className="homeLeftUserCM">
                    {typing.includes(friend._id)
                      ? "typing..."
                      : "current message"}
                  </div>
                  <div className={`states ${status[friend.status]}`}></div>
                </div>
              </div>
            </div>
          ))
        ) : name !== "" ? (
          <h5 className="homeLeftText" style={{ textAlign: "center" }}>
            no friend found!!!
          </h5>
        ) : friends ? (
          friends.map((friend, i) => (
            <div
              key={i}
              className={`homeLeftUserList ${
                myData.blockList.includes(friend._id) ? "block" : ""
              }  ${activeUser === friend._id ? "active" : ""}  `}
              onClick={() => setActive(friend._id)}
            >
              <div
                className={`${
                  activeUsers && activeUsers.includes(friend._id)
                    ? "online"
                    : "offline"
                }  `}
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
              </div>
              <div className="homeLeftUserDetails">
                <div className="homeLeftUser">
                  <div className="homeLeftUserName">{friend.name}</div>
                  <div className="homeLeftUserStatus">
                    <span className="number">3</span>
                  </div>
                </div>
                <div className="homeLeftUserCMC">
                  <div className="homeLeftUserCM">
                    {" "}
                    {typing.includes(friend._id)
                      ? "typing..."
                      : "current message"}
                  </div>
                  <div className={`states ${status[friend.status]}`}></div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h5 className="homeLeftText" style={{ textAlign: "center" }}>
            click on all users and add some friends
          </h5>
        )}
      </ScrollToBottom>
      <input
        className="homeLeftInput"
        type="text"
        placeholder="Search for friend"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyPress={(e) => (e.key === "Enter" ? handleSubmit(e) : null)}
      />
    </div>
  );
}
