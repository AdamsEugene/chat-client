import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { sendMessage, ourChat } from "../../redux/actions";
import SendIcon from "@material-ui/icons/Send";
import AttachmentIcon from "@material-ui/icons/Attachment";
import CameraAltIcon from "@material-ui/icons/CameraAlt";

export default function TextInput() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.myData);
  const currentUser = useSelector((state) => state.users.currentUser);
  const socket = useSelector((state) => state.settings.socket);

  const [message, setMessage] = useState();

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  // console.log(socket);

  const handleSubmit = (e) => {
    if (message) {
      e.preventDefault();
      let data = {};
      data.message = message;
      data.sender = user._id;
      data.receiver = currentUser._id;
      dispatch(sendMessage(user.accessToken, data));
      setMessage("");
      let socketMsgData = {
        sender: user._id,
        receiver: currentUser?._id,
        message,
        shareWith: [],
        seen: false,
        deleteFromMe: { sender: false, receiver: false },
        deleteFromAll: false,
        createdAt: Date.now,
      };
      socket.emit("sendMessage", socketMsgData);
      dispatch(ourChat(user._id, currentUser ? currentUser._id : ""));
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
          onKeyPress={(e) => (e.key === "Enter" ? handleSubmit(e) : null)}
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
