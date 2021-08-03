import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { format } from "timeago.js";
import handleViewport from "react-in-viewport";
import { setSeen } from "../../redux/actions";
import Popup from "../others/popup";
import DeletedMnot from "./deletedMgs";

export default function NotByme({ message, key }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.currentUser);
  const user = useSelector((state) => state.users.myData);

  const Block = (props) => {
    const { forwardedRef } = props;

    return (
      <div ref={forwardedRef}>
        {!user.blockList.includes(message.sender) ? (
          !message.deleteFromAll ? (
            !message.deleteFromMe.receiver ? (
              <div
                className={`messageList ${
                  message.group && message.start
                    ? "StartUs "
                    : message.group && !message.start
                    ? "notStart"
                    : ""
                } `}
                key={key}
              >
                {message.group && !message.start ? (
                  <div className="messageAvatal me"></div>
                ) : (
                  <img
                    className="messageAvatal"
                    src={
                      Object.keys(currentUser).length !== 0 &&
                      currentUser.profilePics.length !== 0
                        ? `data:${currentUser.profilePics[0].contentType};base64,${currentUser.profilePics[0].image}`
                        : "https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png"
                    }
                    alt="N"
                  />
                )}

                <div className="msgbody">
                  <div
                    className={`Time ${
                      message.group && !message.start ? "nospace" : ""
                    }`}
                  >
                    <span className="messageTime">
                      {format(message.createdAt)}
                    </span>
                  </div>
                  <div className="messageDetails">
                    <Popup
                      id={message._id}
                      data={
                        user._id === message.sender
                          ? {
                              sender: true,
                              receiver: message.deleteFromMe.receiver,
                            }
                          : {
                              receiver: true,
                              sender: message.deleteFromMe.sender,
                            }
                      }
                    />
                    <div className="messageCM">{message.message}</div>
                  </div>
                </div>
              </div>
            ) : (
              <DeletedMnot
                createdAt={message.createdAt}
                message={message}
                sendder={true}
              />
            )
          ) : (
            <DeletedMnot createdAt={message.createdAt} message={message} />
          )
        ) : (
          <div style={{ color: "#fff" }}>Blocked message</div>
        )}
      </div>
    );
  };

  const ViewportBlock = handleViewport(Block /** options: {}, config: {} **/);

  return (
    <ViewportBlock
      onEnterViewport={() =>
        !message.seen ? dispatch(setSeen(user.accessToken, message._id)) : ""
      }
    />
  );
}
