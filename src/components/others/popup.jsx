import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { addFriend, blockUser, deleteFromMe } from "../../redux/actions";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

export default function Popup({ user, classs, id, purpose, block, data }) {
  const dispatch = useDispatch();
  const myData = useSelector((state) => state.users.myData);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (id, type, data) => {
    switch (type) {
      case "addfriend":
        if (Object.keys(myData).length !== 0)
          if (id) {
            dispatch(addFriend(myData.accessToken, { id }));
          }

        break;

      case "blockuser":
        if (Object.keys(myData).length !== 0)
          if (id) dispatch(blockUser(myData.accessToken, { id }));
        break;

      case "delfromme":
        if (Object.keys(myData).length !== 0)
          if (id) dispatch(deleteFromMe(myData.accessToken, id, data));
        break;

      default:
        break;
    }
    setAnchorEl(null);
  };

  return (
    <div className={user ? "" : classs ? "more groupic" : "more"}> 
      <MoreHorizIcon className="moreIcon" onClick={handleClick} />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {user ? (
          <>
            <MenuItem onClick={() => handleClose(id, "addfriend")}>
              {purpose === "all" ? "Add as friend" : "Unfriend user"}
            </MenuItem>
            <MenuItem onClick={() => handleClose(id, "addtogroup")}>
              Add to group
            </MenuItem>
            {purpose !== "all" ? (
              <>
                <MenuItem onClick={() => handleClose(id, "makeadmin")}>
                  Make admin
                </MenuItem>
                <MenuItem onClick={() => handleClose(id, "addtogroup")}>
                  Add to group
                </MenuItem>
                <MenuItem onClick={() => handleClose(id, "blockuser")}>
                  {block === "block" ? "Unblock user" : "Block user"}
                </MenuItem>
              </>
            ) : (
              ""
            )}
          </>
        ) : classs ? (
          <>
            <MenuItem onClick={() => handleClose(id, "joingroup")}>
              Join group
            </MenuItem>
            <MenuItem onClick={() => handleClose(id, "blockgroup")}>
              Block group
            </MenuItem>
            <MenuItem onClick={() => handleClose(id, "editgroup")}>
              Edit group
            </MenuItem>
            <MenuItem onClick={() => handleClose(id, "exitgroup")}>
              Exit group
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={() => handleClose(id, "share")}>Share</MenuItem>
            <MenuItem onClick={() => handleClose(id, "delfromme", data)}>
              Delete from me
            </MenuItem>
            <MenuItem onClick={() => handleClose(id, "delfromall")}>
              Delete from all
            </MenuItem>
          </>
        )}
      </Menu>
    </div>
  );
}
