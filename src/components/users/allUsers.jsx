import React, { useEffect, useState } from "react";
import { css } from "@emotion/css";
import ScrollToBottom from "react-scroll-to-bottom";
import { useDispatch, useSelector } from "react-redux";
import { allUsers } from "../../redux/actions";

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

  const [activeUser, setActiveUser] = useState();

  useEffect(() => {
    if (Object.keys(myData).length !== 0 && !users)
      dispatch(allUsers(myData.accessToken));
  }, [dispatch, users, myData]);

  const status = ["actives", "away", "busy"];

  const setActive = (id) => {
    setActiveUser(id);
    // dispatch(currentUser(id));
  };

  return (
    <div>
      <h3 className="homeLeftText">New Users</h3>
      <ScrollToBottom className={ROOT_CSS} mode="top">
        {users ? (
          users.map((user) =>
            user._id !== myData._id && !myData.friends.includes(user._id) ? (
              <div
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
                    <div className="homeLeftUserCM">
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
          <h6 className="homeLeftText" style={{ textAlign: "center" }}>
            loading...
          </h6>
        )}
      </ScrollToBottom>
      <input
        className="homeLeftInput"
        type="text"
        placeholder="Search for user"
      />
    </div>
  );
}
