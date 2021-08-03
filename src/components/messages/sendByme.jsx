import React from "react";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import handleViewport from "react-in-viewport";
import DoneIcon from "@material-ui/icons/Done";

// import { setCountToZero, setCount } from "../redux/actions";

import DoneAllIcon from "@material-ui/icons/DoneAll";
import Popup from "../others/popup";
import DeletedMnot from "./deletedMgs";

export default function SendByme({ message, key, count }) {
  // const dispatch = useDispatch();
  const user = useSelector((state) => state.users.myData);

  const Block = (props) => {
    // inViewport,
    const { forwardedRef } = props;

    return (
      <div ref={forwardedRef}>
        {!user.blockList.includes(message.sender) ? (
          !message.deleteFromMe.sender ? (
            !message.deleteFromAll ? (
              <div
                className={`messageList me ${
                  message.group && message.start
                    ? "StartUs "
                    : message.group && !message.start
                    ? "notStart"
                    : ""
                } `}
                key={key}
              >
                <div className="msgbody">
                  <div
                    className={`Time me ${
                      message.group && !message.start ? "nospace" : ""
                    }`}
                  >
                    <span className="messageTime">
                      {format(message.createdAt)}
                    </span>
                  </div>
                  <div className="messageDetails me">
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
                    <div className="seen">
                      {message.seen ? (
                        <DoneAllIcon className="checkSeen two" />
                      ) : (
                        <DoneIcon className="checkSeen" />
                      )}
                    </div>
                    <div className="messageCM">{message.message}</div>
                  </div>
                </div>
                {message.group && !message.start ? (
                  <div className="messageAvatal me"></div>
                ) : (
                  <img
                    className="messageAvatal me"
                    src={
                      Object.keys(user).length !== 0 &&
                      user.profilePics.length > 0
                        ? `data:${user.profilePics[0].contentType};base64,${user.profilePics[0].image}`
                        : "https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png"
                    }
                    alt="N"
                  />
                )}
              </div>
            ) : (
              <DeletedMnot
                createdAt={message.createdAt}
                me="me"
                message={message}
              />
            )
          ) : (
            <DeletedMnot
              createdAt={message.createdAt}
              me="me"
              sendder={true}
              message={message}
            />
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
      onEnterViewport={() => ""}
    />
  );
}
