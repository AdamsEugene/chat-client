import React from "react";
import { format } from "timeago.js";

export default function ByAdmin({ message, key }) {
  console.log(message.createdAt)
  return (
    <div>
      <div className={`messageList admin `} key={key}>
        <div className="msgbody">
          <div className="Time admin">
            <span className="messageTime admin">
              admin {format(message.createdAt)}
            </span>
          </div>
          <div className="messageDetails admin">
            <div className="messageAm">
              <div className="messageCM admin">{message.message}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
