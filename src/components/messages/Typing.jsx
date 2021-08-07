import React from "react";
import { useSelector } from "react-redux";
import handleViewport from "react-in-viewport";
import Dot from "../others/Dot";

export default function Typing({ memberName, group }) {
  const currentGroup = useSelector((state) => state.groups.currentGroup);
  const currentUser = useSelector((state) => state.users.currentUser);
  const Block = (props) => {
    const { forwardedRef } = props;

    return (
      <div ref={forwardedRef}>
        <div className={`messageList `}>
          <div className="messageAvatal me"></div>
          <div className="msgbody">
            <div className={`messageDetails`}>
              <div className="messageCM typing">
                {currentGroup && Object.keys(currentGroup).length !== 0 && (
                  <p className="p">{`${
                    memberName && memberName.split(" ")[0]
                  } is typing`}</p>
                )}
                {currentUser && Object.keys(currentUser).length !== 0 && (
                  <p className="p">typing</p>
                )}
                <p className="p">
                  <Dot group={group} />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ViewportBlock = handleViewport(Block /** options: {}, config: {} **/);

  return <ViewportBlock onEnterViewport={() => ""} />;
}
