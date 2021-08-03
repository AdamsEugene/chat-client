import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { css } from "@emotion/css";
import ScrollToBottom from "react-scroll-to-bottom";
import AddCircle from "@material-ui/icons/AddCircle";

import Popup from "../others/popup";

import { userGroup, currentGroup, showGroupDialog } from "../../redux/actions";

const ROOT_CSS = css({
  height: "69vh",
  // width: "100%",
  // backgroundColor: "rgba(255, 255, 255, 0.05)",
});

export default function Groups() {
  const dispatch = useDispatch();
  const myData = useSelector((state) => state.users.myData);
  const groups = useSelector((state) => state.groups.groups);

  const [activeUser, setActiveUser] = useState();

  useEffect(() => {
    if (Object.keys(myData).length !== 0 && groups.length === 0)
      dispatch(userGroup(myData.accessToken));
  }, [dispatch, myData, groups]);

  const setActive = (id) => {
    setActiveUser(id);
    dispatch(currentGroup(id));
  };

  const handleGreateGroup = () => dispatch(showGroupDialog(true));

  return (
    <div className="groupsContainer">
      <h3 className="homeLeftText">Groups</h3>
      <ScrollToBottom className={ROOT_CSS} mode="top">
        {groups ? (
          groups.map((group) => (
            <div
              className={`homeLeftUserList ${
                activeUser === group._id ? "active" : ""
              } `}
              onClick={() => setActive(group._id)}
            >
              <img
                className="homeLeftUserAvatal"
                src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=676&q=80"
                alt="N"
              />
              <div className="homeLeftUserDetails">
                <div className="homeLeftUser">
                  <div className="nameCont">
                    <div className="homeLeftUserName ">{group.name}</div>
                    <div className="homeLeftUserName groupDics">{group.dics}</div>
                  </div>
                  <Popup user={false} classs={true} id={group._id} />
                </div>
                <div className="homeLeftUserCMC"></div>
              </div>
            </div>
          ))
        ) : (
          <h3 className="homeLeftText">Create group to display here</h3>
        )}
      </ScrollToBottom>
      <input
        className="homeLeftInput"
        type="text"
        placeholder="Find Group ..."
      />
      <div className="createGroup" onClick={handleGreateGroup}>
        <AddCircle className="AddCircle" />
      </div>
    </div>
  );
}
