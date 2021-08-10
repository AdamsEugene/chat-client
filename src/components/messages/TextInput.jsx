import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { sendMessage, sendGroupMessage } from "../../redux/actions";
import SendIcon from "@material-ui/icons/Send";
import AttachmentIcon from "@material-ui/icons/Attachment";
import CameraAltIcon from "@material-ui/icons/CameraAlt";

export default function TextInput() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.myData);
  const currentUser = useSelector((state) => state.users.currentUser);
  const socket = useSelector((state) => state.settings.socket);
  const currentGroup = useSelector((state) => state.groups.currentGroup);

  const [message, setMessage] = useState();
  const [check, setCheck] = useState(true);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  let typing = false;

  const timeOut = () => {
    typing = false;
    setCheck(true);
    currentUser &&
      Object.keys(currentUser).length !== 0 &&
      check &&
      socket?.emit("not typing", user._id);

    check &&
      currentGroup &&
      Object.keys(currentGroup).length !== 0 &&
      socket?.emit("not typing group", currentGroup.name);
  };

  const handleIsTyping = (e) => {
    if (!typing) {
      typing = true;
      currentUser &&
        Object.keys(currentUser).length !== 0 &&
        check &&
        socket?.emit("is typing", user._id);

      currentGroup &&
        check &&
        Object.keys(currentGroup).length !== 0 &&
        socket?.emit("is typing group", {
          groupName: currentGroup.name,
          userName: user.name,
        });

      setCheck(false);
      setTimeout(timeOut, 5000);
    }
  };

  const handleSubmit = (e) => {
    if (message) {
      e.preventDefault();
      let data = {};
      data.message = message;
      data.sender = user._id;
      if (currentUser && Object.keys(currentUser).length !== 0)
        data.receiver = currentUser._id;
      if (currentGroup && Object.keys(currentGroup).length !== 0)
        data.groupId = currentGroup._id;
      data.createdAt = Date.now();
      data.name = user?.name;
      currentUser &&
        Object.keys(currentUser).length !== 0 &&
        dispatch(sendMessage(user.accessToken, data));

      currentGroup &&
        Object.keys(currentGroup).length !== 0 &&
        dispatch(sendGroupMessage(user.accessToken, data));

      let socketMsgData = {
        sender: user._id,
        receiver:
          currentUser && Object.keys(currentUser).length !== 0
            ? currentUser?._id
            : currentGroup.name,
        message,
        shareWith: [],
        seen: false,
        deleteFromMe: { sender: false, receiver: false },
        deleteFromAll: false,
        createdAt: Date.now(),
        groupId: currentGroup?._id,
        name: user?.name,
      };
      currentUser &&
        Object.keys(currentUser).length !== 0 &&
        socket?.emit("sendMessage", socketMsgData);
      // groupId
      currentGroup &&
        Object.keys(currentGroup).length !== 0 &&
        socket?.emit("send GroupM essage", socketMsgData);

      currentUser &&
        Object.keys(currentUser).length !== 0 &&
        socket?.emit("not typing", user._id);

      currentGroup &&
        Object.keys(currentGroup).length !== 0 &&
        socket?.emit("not typing group", currentGroup.name);

      setMessage("");
    }
  };

  const disable = !currentUser;

  return (
    <>
      <div className="formCont">
        <div type="submit" className="sendMessage">
          <div className="oneItem">
            <AttachmentIcon />
          </div>
        </div>
        <div type="submit" className="sendMessage">
          <div className="oneItem">
            <CameraAltIcon />
          </div>
        </div>
        <input
          type="text"
          className="messageBox"
          disabled={disable}
          onChange={(e) => handleInputChange(e)}
          value={message}
          onKeyPress={(e) =>
            e.key === "Enter" ? handleSubmit(e) : handleIsTyping(e)
          }
          autoFocus={disable}
        />
        <div
          type="submit"
          className="sendMessage"
          onClick={(e) => handleSubmit(e)}
        >
          <div className="oneItem">
            <SendIcon />
          </div>
        </div>
      </div>
    </>
  );
}
