import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { css } from "@emotion/css";
import ScrollToBottom from "react-scroll-to-bottom";

import {
  refreshBackgroundImage,
  allMyMessage,
  ourChat,
  updatadMessage,
  connectToSocket,
  sendMessageSocket,
} from "../../redux/actions";

import "./chat.css";
import ByAdmin from "./byAdmin";
import SendByme from "./sendByme";
import NotByme from "./notByme";

export default function ChatArea() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.myData);
  const currentUser = useSelector((state) => state.users.currentUser);
  const messages = useSelector((state) => state.messages.ourChat);
  const allMgs = useSelector((state) => state.messages.messages);
  const mgs = useSelector((state) => state.messages.mgs);
  const backgroungImage = useSelector(
    (state) => state.settings.backgroundImage
  );
  const socket = useSelector((state) => state.settings.socket);

  // const [onlineUsers, setOnlineUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

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
    dispatch(ourChat(user._id, currentUser ? currentUser._id : ""));
  }, [currentUser, dispatch, user, mgs, allMgs]);

  useEffect(() => {
    if (user._id) dispatch(connectToSocket());
  }, [dispatch, user._id]);

  useEffect(() => {
    socket?.emit("addMember", user._id);
  }, [socket, user._id]);

  useEffect(() => {
    socket?.on("newMember", (member) =>
      setOnlineUsers((prev) => [...prev, ...member])
    );

    socket?.on("someone left", (members) => setOnlineUsers([...members]));
  }, [socket]);

  useEffect(() => {
    socket?.on("newMessage", (data) => {
      dispatch(sendMessageSocket(data));
      dispatch(ourChat(user._id, currentUser?._id));
      console.log(data);
    });
  }, [socket, dispatch, user._id, currentUser?._id]);

  console.log(onlineUsers);

  return (
    <div>
      <ScrollToBottom
        className={ROOT_CSS}
        followButtonClassName="followButtonClass"
        initialScrollBehavior="auto"
      >
        {currentUser && Object.keys(currentUser).length !== 0 ? (
          <>
            {messages.length > 0 ? (
              messages.map((message, i) =>
                Object.keys(message).length !== 0 ? (
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
                  message: `messages between you ${currentUser.name} are encrypted`,
                }}
              />
            )}
          </>
        ) : (
          ""
        )}
      </ScrollToBottom>
    </div>
  );
}
