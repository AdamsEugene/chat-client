import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { css } from "@emotion/css";
import ScrollToBottom from "react-scroll-to-bottom";
import SyncIcon from "@material-ui/icons/Sync";

import {
  refreshBackgroundImage,
  allMyMessage,
  ourChat,
  updatadMessage,
  connectToSocket,
  sendMessageSocket,
  receivedMessage,
  activeUsers,
  userLeft,
  myCurrentGroupChat,
  // receiveGroupMessageSocket,
  sendGroupMessageSocket,
  userGroup,
  allUsers,
  userFriends,
} from "../../redux/actions";

import "./chat.css";
import ByAdmin from "./byAdmin";
import SendByme from "./sendByme";
import NotByme from "./notByme";
import Typing from "./Typing";

export default function ChatArea() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.myData);
  const currentUser = useSelector((state) => state.users.currentUser);
  const messages = useSelector((state) => state.messages.ourChat);
  const allMgs = useSelector((state) => state.messages.messages);
  const mgs = useSelector((state) => state.messages.mgs);
  const localSeen = useSelector((state) => state.messages.lseen);
  const backgroungImage = useSelector(
    (state) => state.settings.backgroundImage
  );
  const socket = useSelector((state) => state.settings.socket);
  const groups = useSelector((state) => state.groups.groups);
  const currentGroup = useSelector((state) => state.groups.currentGroup);
  const allGgroup_Messages = useSelector((state) => state.groups.messages);
  const currentGroupChat = useSelector(
    (state) => state.groups.currentGroupChat
  );

  // const [onlineUsers, setOnlineUsers] = useState([]);
  const [typing, setTyping] = useState([]);
  const [memberName, setMemberName] = useState();

  const ROOT_CSS = css({
    height: "83.5vh",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    backgroundImage: `url(${
      backgroungImage
        ? `data:${backgroungImage.backgroudImage.contentType};base64,${backgroungImage.backgroudImage.image}`
        : ""
    })`,
    // mixBlendMode: "exclusion",
    objectFit: "fill",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
  });

  const refreshPage = () => {
    dispatch(userGroup(user.accessToken));
    dispatch(allUsers(user.accessToken));
    dispatch(userFriends(user.accessToken));
  };

  useEffect(() => {
    if (
      Object.keys(user).length !== 0 &&
      Object.keys(backgroungImage).length === 0
    )
      dispatch(refreshBackgroundImage(user.accessToken));
  }, [dispatch, user, backgroungImage]);

  useEffect(() => {
    if (Object.keys(user).length !== 0 && Object.keys(allMgs).length === 0)
      dispatch(allMyMessage(user.accessToken));
  }, [user, dispatch, allMgs]);

  useEffect(() => {
    dispatch(updatadMessage());
  }, [mgs, dispatch]);

  useEffect(() => {
    dispatch(ourChat(user?._id, currentUser?._id));
  }, [currentUser?._id, dispatch, user?._id, mgs, allMgs]);

  useEffect(() => {
    dispatch(myCurrentGroupChat(currentGroup?._id));
  }, [dispatch, currentGroup?._id, allGgroup_Messages]);

  useEffect(() => {
    if (user._id) dispatch(connectToSocket());
  }, [dispatch, user._id]);

  useEffect(() => {
    socket?.emit("addMember", user._id);
  }, [socket, user._id]);

  useEffect(() => {
    if (groups && groups.length > 0) {
      groups.forEach((group) => {
        socket?.emit("join group", group.name);
      });
    }
  }, [groups, socket]);

  useEffect(() => {
    socket?.on("newMember", (member) => dispatch(activeUsers(member)));

    socket?.on("someone left", (members) => dispatch(userLeft(members)));
  }, [socket, dispatch]);

  useEffect(() => {
    socket?.on("newMessage", (data) => {
      dispatch(sendMessageSocket(data));
    });
  }, [socket, dispatch]);

  useEffect(() => {
    socket?.on("group message incomming", (message) =>
      dispatch(sendGroupMessageSocket(message))
    );
  }, [socket, dispatch]);

  useEffect(() => {
    socket?.on("some one typing", (typing) => setTyping(typing));
  });

  useEffect(() => {
    socket?.on("group member is typing", (name) => setMemberName(name));
  });

  useEffect(() => {
    dispatch(receivedMessage(user._id, currentUser?._id));
  }, [dispatch, user._id, currentUser?._id, allMgs, localSeen]);

  // useEffect(() => {
  //   dispatch(receiveGroupMessageSocket(currentGroup?._id));
  // }, [dispatch, currentGroup?._id, allGgroup_Messages]);

  // console.log(currentGroupChat);

  return (
    <div className="baseCont">
      <ScrollToBottom
        className={ROOT_CSS}
        followButtonClassName="followButtonClass"
        initialScrollBehavior="auto"
      >
        {currentUser && Object.keys(currentUser).length !== 0 ? (
          <div>
            {messages.length > 0 ? (
              messages.map((message, i) =>
                message && Object.keys(message).length !== 0 ? (
                  <span key={i}>
                    {message.sender === "admin" ? (
                      <ByAdmin message={message} key={i} count={i} />
                    ) : message.sender === user._id ? (
                      <SendByme message={message} key={i} count={i} />
                    ) : (
                      <NotByme message={message} key={i} count={i} />
                    )}
                  </span>
                ) : (
                  ""
                )
              )
            ) : (
              <ByAdmin
                message={{
                  createdAt: Date.now(),
                  message: `messages between you and ${currentUser.name} are encrypted`,
                }}
              />
            )}
            {typing.includes(currentUser && currentUser._id) ? (
              <Typing />
            ) : null}
          </div>
        ) : currentGroup && Object.keys(currentGroup).length !== 0 ? (
          <div>
            {currentGroupChat.length > 0 ? (
              currentGroupChat.map((message, i) =>
                message && Object.keys(message).length !== 0 ? (
                  <span key={i}>
                    {message.sender === "admin" ? (
                      <ByAdmin message={message} key={i} count={i} />
                    ) : message.sender === user._id ? (
                      <SendByme message={message} key={i} count={i} />
                    ) : (
                      <NotByme message={message} key={i} count={i} />
                    )}
                  </span>
                ) : (
                  ""
                )
              )
            ) : (
              <ByAdmin
                message={{
                  createdAt: Date.now(),
                  message: `messages between ${currentGroup.name} are encrypted`,
                }}
              />
            )}
            {memberName &&
            user.name !== memberName.userName &&
            currentGroup.name === memberName.groupName ? (
              <Typing memberName={memberName.userName} group={true} />
            ) : null}
          </div>
        ) : (
          <h5 className="homeLeftText" style={{ textAlign: "center" }}>
            chat with friends or your group members; you can use the default
            room for public chat
          </h5>
        )}
      </ScrollToBottom>
      <div className="refreshBtn" onClick={refreshPage}>
        <div className="refresh">
          <SyncIcon className="SyncIcon" />
        </div>
      </div>
    </div>
  );
}
