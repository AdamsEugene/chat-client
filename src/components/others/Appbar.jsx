import React from "react";
import { useSelector, useDispatch } from "react-redux";
import SettingsIcon from "@material-ui/icons/Settings";
import NotificationsIcon from "@material-ui/icons/Notifications";
import FavoriteIcon from "@material-ui/icons/Favorite";

import {
  showUserDialog,
  showSettingsDialog,
  showStatusDialog,
} from "../../redux/actions";

export default function Appbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.myData);
  const currentUser = useSelector((state) => state.users.currentUser);
  const settings = useSelector((state) => state.settings.showSettingsDialog);
  const setting = useSelector((state) => state.settings.showUserDialog);
  const statusD = useSelector((state) => state.settings.showStatusDialog);
  const currentGroup = useSelector((state) => state.groups.currentGroup); 
  const groupMembers = useSelector((state) => state.groups.members);
  const membersLocal = useSelector((state) => state.groups.membersLocal);

  const showUser = () => dispatch(showUserDialog(!setting));

  const showStatus = () => dispatch(showStatusDialog(!statusD));

  const showSettings = () => dispatch(showSettingsDialog(!settings));

  const status = ["actives", "away", "busy"];

  return (
    <div className="appBer">
      <div className="appBerItems">
        <div className="appbarLeft">
          <img
            className="messageAvatal me"
            onClick={showStatus}
            src={
              currentUser &&
              Object.keys(currentUser).length !== 0 &&
              currentUser.profilePics.length !== 0
                ? `data:${currentUser.profilePics[0].contentType};base64,${currentUser.profilePics[0].image}`
                : currentGroup && currentGroup.groupPics
                ? `data:${currentGroup.groupPics.contentType};base64,${currentGroup.groupPics.image}`
                : "https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png"
            }
            alt="N"
          />
          <div className="homeLeftUserCMC">
            <div className="appbarLeftUsername">
              {currentUser ? currentUser.name : ""}
              {currentGroup ? currentGroup.name : ""}
            </div>
            <div
              className={
                currentUser && Object.keys(currentUser).length !== 0
                  ? ` states ${status[currentUser.status]} mail`
                  : ""
              }
            ></div>
            {currentGroup && Object.keys(currentGroup).length !== 0 ? (
              membersLocal.length > 0 ? (
                <div className="groupMembersList">
                  {membersLocal.map((member, i) => {
                    if (i < 4) {
                      return (
                        <p className="names" key={i}>
                          {member._id === user._id ? "You" : member?.name.split(" ")[0]},
                        </p>
                      );
                    } else return null;
                  })}
                  ...
                </div>
              ) : groupMembers.length > 0 ? (
                <div className="groupMembersList">
                  {groupMembers.map((member, i) => {
                    if (i < 4) {
                      return (
                        <p className="names" key={i}>
                          {member._id === user._id ? "You" : member?.name.split(" ")[0]},
                        </p>
                      );
                    } else return null;
                  })}
                  ...
                </div>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="appbarRight">
          <div className="item">
            <div className="oneItem">
              <FavoriteIcon className="icons fi" />
            </div>
          </div>
          <div className="item">
            <div className="oneItem">
              <NotificationsIcon className="icons ni" />
            </div>
          </div>
          <div className="item">
            <div className="oneItem" onClick={showSettings}>
              <SettingsIcon className="icons si" />
            </div>
          </div>
          <div className="item">
            <div className="oneItem">
              <img
                className="messageAvatal logo"
                onClick={showUser}
                src={
                  Object.keys(user).length !== 0 && user.profilePics.length > 0
                    ? `data:${user.profilePics[0].contentType};base64,${user.profilePics[0].image}`
                    : "https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png"
                }
                alt="N"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
