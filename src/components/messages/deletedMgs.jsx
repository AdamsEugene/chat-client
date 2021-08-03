import React from "react";
import { format } from "timeago.js";
import handleViewport from "react-in-viewport";
import DoneIcon from "@material-ui/icons/Done";
import DoneAllIcon from "@material-ui/icons/DoneAll";

export default function DeletedMnot({ createdAt, me, sendder, message }) {
  const Block = (props) => {
    const { forwardedRef } = props;
    return (
      <div ref={forwardedRef}>
        <div
          className={`messageList ${me}  ${
            message.group && message.start
              ? "StartUs "
              : message.group && !message.start
              ? "notStart"
              : ""
          }`}
        >
          {!me ? <div className="messageAvatal me"></div> : ""}
          <div className="msgbody">
            <div
              className={`Time ${me} ${
                message.group && !message.start ? "nospace" : ""
              }`}
            >
              <span className="messageTime">{format(createdAt)}</span>
            </div>
            <div className={`messageDetails ${me}`}>
              <div className="seen">
                {message.seen ? (
                  <DoneAllIcon className="checkSeen two" />
                ) : (
                  <DoneIcon className="checkSeen" />
                )}
              </div>
              {me ? (
                <div className="messageCM">
                  {sendder
                    ? "you deleted this message"
                    : "this message was deleted"}
                </div>
              ) : (
                <div className="messageCM">
                  {sendder
                    ? "you deleted this message"
                    : "this message was deleted"}
                </div>
              )}
            </div>
          </div>
          {me ? <div className="messageAvatal me"></div> : ""}
        </div>
      </div>
    );
  };

  const ViewportBlock = handleViewport(Block /** options: {}, config: {} **/);

  return <ViewportBlock onEnterViewport={() => ""} />;
}
