import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { css } from "@emotion/css";
import ScrollToBottom from "react-scroll-to-bottom";
import AddCircle from "@material-ui/icons/AddCircle";

import Popup from "../others/popup";

import {
  userGroup,
  currentGroup,
  showGroupDialog,
  currentUser,
  activeGroups,
  groupMembers,
  groupMembersLocal,
  getGroupMessage,
} from "../../redux/actions";

const ROOT_CSS = css({
  height: "69vh",
  // width: "100%",
  // backgroundColor: "rgba(255, 255, 255, 0.05)",
});

export default function Groups() {
  const dispatch = useDispatch();
  const myData = useSelector((state) => state.users.myData);
  const groups = useSelector((state) => state.groups.groups);
  const active_Groups = useSelector((state) => state.groups.activeGroups);

  const [activeUser, setActiveUser] = useState();

  useEffect(() => {
    if (Object.keys(myData).length !== 0 && groups.length === 0)
      dispatch(userGroup(myData.accessToken));
  }, [dispatch, myData, groups]);

  const setActive = (id) => {
    setActiveUser(id);
    dispatch(currentGroup(id));
    dispatch(activeGroups(id));
    if (!active_Groups.includes(id)) {
      dispatch(groupMembers(myData.accessToken, id));
      dispatch(getGroupMessage(myData.accessToken, id));
    }
    dispatch(currentUser(45));
    dispatch(groupMembersLocal(id));
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
              <div className="offline">
                <img
                  className="homeLeftUserAvatal"
                  src={
                    group.groupPics
                      ? `data:${group.groupPics.contentType};base64,${group.groupPics.image}`
                      : "https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png"
                  }
                  alt="N"
                />
              </div>
              <div className="homeLeftUserDetails">
                <div className="homeLeftUser">
                  <div className="nameCont">
                    <div className="homeLeftUserName ">{group.name}</div>
                    <div className="homeLeftUserName groupDics">
                      {group.dics}
                    </div>
                  </div>
                </div>
                <div className="homeLeftUserCMC"></div>
              </div>
              <div className="groupMoreCont">
                <Popup user={false} classs={true} id={group._id} />
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
