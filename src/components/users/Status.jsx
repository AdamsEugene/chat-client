import React from "react";
import { useSelector } from "react-redux";
import { css } from "@emotion/css";
import ScrollToBottom from "react-scroll-to-bottom";

const ROOT_CSS = css({
  height: "40vh",
  width: "100%",
  // backgroundColor: "rgb(238, 215, 228)",
});

export default function Status() {
  const currentUser = useSelector((state) => state.users.currentUser);

  return (
    <div>
      <ScrollToBottom className={ROOT_CSS}>
        {currentUser &&
        Object.keys(currentUser).length !== 0 &&
        currentUser.statusPics.length !== 0 ? (
          currentUser.statusPics.map((statu) => (
            <div className="statusPics statusRap">
              <img
                className="sImg"
                src={`data:${statu.contentType};base64,${statu.image}`}
                alt="U"
              />
              <div className="statusText">{statu.about}</div>
            </div>
          ))()
        ) : (
          <div className="homeLeftText" style={{ textAlign: "center" }}>
            Uplad status to display here
          </div>
        )}
      </ScrollToBottom>
    </div>
  );
}
