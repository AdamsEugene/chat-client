import React from "react";
import { useSelector, useDispatch } from "react-redux";
import SettingsIcon from "@material-ui/icons/Settings";
import NotificationsIcon from "@material-ui/icons/Notifications";
import FavoriteIcon from "@material-ui/icons/Favorite";

import { showUserDialog, showSettingsDialog } from "../../redux/actions";

export default function Appbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.myData);
  const currentUser = useSelector((state) => state.users.currentUser);
  const settings = useSelector((state) => state.settings.showSettingsDialog);
  const setting = useSelector((state) => state.settings.showUserDialog);

  const showUser = () => dispatch(showUserDialog(!setting));

  const showSettings = () => dispatch(showSettingsDialog(!settings));

  const status = ["actives", "away", "busy"];

  return (
    <div className="appBer">
      <div className="appBerItems">
        <div className="appbarLeft">
          <img
            className="messageAvatal me"
            src={
              currentUser &&
              Object.keys(currentUser).length !== 0 &&
              currentUser.profilePics.length !== 0
                ? `data:${currentUser.profilePics[0].contentType};base64,${currentUser.profilePics[0].image}`
                : "https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png"
            }
            alt="N"
          />
          <div className="homeLeftUserCMC">
            <div className="appbarLeftUsername">
              {currentUser ? currentUser.name : ""}
            </div>
            <div
              className={
                currentUser && Object.keys(currentUser).length !== 0
                  ? ` states ${status[currentUser.status]} mail`
                  : ""
              }
            ></div>
            <div className="groupMembersList">
              <p className="names">Adams,</p>
              <p className="names">Capo,</p>
              <p className="names">Sam,</p>
              <p className="names">Tom,</p>
              <p className="names">...</p>
            </div>
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
