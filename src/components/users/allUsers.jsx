import React, { useEffect, useState } from "react";
import { css } from "@emotion/css";
import ScrollToBottom from "react-scroll-to-bottom";
import { useDispatch, useSelector } from "react-redux";

import { allUsers, searchForUser } from "../../redux/actions";

// import Skeleton from "../components/skeleton"
import Popup from "../others/popup";

const ROOT_CSS = css({
  height: "69vh",
  // width: "100%",
  // backgroundColor: "rgba(255, 255, 255, 0.05)",
});

export default function AllUsers() {
  const dispatch = useDispatch();
  const myData = useSelector((state) => state.users.myData);
  const users = useSelector((state) => state.users.users);
  const activeUsers = useSelector((state) => state.users.activeUsers);
  const searchResults = useSelector((state) => state.users.searchResults);

  const [activeUser, setActiveUser] = useState();
  const [name, setName] = useState("");

  useEffect(() => {
    if (Object.keys(myData).length !== 0 && (!users || users.length === 0))
      dispatch(allUsers(myData.accessToken));
  }, [dispatch, users, myData]);

  const status = ["actives", "away", "busy"];

  const setActive = (id) => {
    setActiveUser(id);
    // dispatch(currentUser(id));
  };

  const handleSubmit = (e) => setName("");

  useEffect(() => {
    dispatch(searchForUser(name));
  }, [name, dispatch]);

  return (
    <div>
      <h3 className="homeLeftText">New Users</h3>
      <ScrollToBottom className={ROOT_CSS} mode="top">
        {searchResults && searchResults?.length !== 0 && name !== "" ? (
          searchResults.map((user, i) =>
            user._id !== myData._id && !myData.friends.includes(user._id) ? (
              <div
                key={i}
                className={`homeLeftUserList ${
                  activeUser === user._id ? "active" : ""
                } `}
                onClick={() => setActive(user._id)}
              >
                <div className="offline">
                  <img
                    className="homeLeftUserAvatal"
                    src={
                      user.profilePics[0]
                        ? `data:${user.profilePics[0].contentType};base64,${user.profilePics[0].image}`
                        : "https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png"
                    }
                    alt="N"
                  />
                </div>
                <div className="homeLeftUserDetails">
                  <div className="homeLeftUser">
                    <div className="homeLeftUserName">{user.name}</div>
                    <div className="homeLeftUserStatus">
                      <span className="number">
                        <Popup user={true} id={activeUser} purpose="all" />
                      </span>
                    </div>
                  </div>
                  <div className="homeLeftUserCMC">
                    <div
                      className={`homeLeftUserCM ${
                        activeUsers && activeUsers.includes(user._id)
                          ? "onlines"
                          : ""
                      }`}
                    >
                      {activeUsers && activeUsers.includes(user._id)
                        ? "Online"
                        : "Offline"}
                    </div>
                    <div className={`states ${status[user.status]}`}></div>
                  </div>
                </div>
              </div>
            ) : null
          )
        ) : name !== "" ? (
          <h5 className="homeLeftText" style={{ textAlign: "center" }}>
            no user found!!!
          </h5>
        ) : users ? (
          users.map((user, i) =>
            user._id !== myData._id && !myData.friends.includes(user._id) ? (
              <div
                key={i}
                className={`homeLeftUserList ${
                  activeUser === user._id ? "active" : ""
                } `}
                onClick={() => setActive(user._id)}
              >
                <div className="offline">
                  <img
                    className="homeLeftUserAvatal"
                    src={
                      user.profilePics[0]
                        ? `data:${user.profilePics[0].contentType};base64,${user.profilePics[0].image}`
                        : "https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png"
                    }
                    alt="N"
                  />
                </div>
                <div className="homeLeftUserDetails">
                  <div className="homeLeftUser">
                    <div className="homeLeftUserName">{user.name}</div>
                    <div className="homeLeftUserStatus">
                      <span className="number">
                        <Popup user={true} id={activeUser} purpose="all" />
                      </span>
                    </div>
                  </div>
                  <div className="homeLeftUserCMC">
                    <div
                      className={`homeLeftUserCM ${
                        activeUsers && activeUsers.includes(user._id)
                          ? "onlines"
                          : ""
                      }`}
                    >
                      {activeUsers && activeUsers.includes(user._id)
                        ? "Online"
                        : "Offline"}
                    </div>
                    <div className={`states ${status[user.status]}`}></div>
                  </div>
                </div>
              </div>
            ) : null
          )
        ) : (
          <h5 className="homeLeftText" style={{ textAlign: "center" }}>
            Loading...
          </h5>
        )}
      </ScrollToBottom>
      <input
        className="homeLeftInput"
        type="text"
        placeholder="Search for user"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyPress={(e) => (e.key === "Enter" ? handleSubmit(e) : null)}
      />
    </div>
  );
}
