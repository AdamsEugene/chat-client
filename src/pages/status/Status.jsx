import React from "react";
import "./status.css";

export default function Status() {
  return (
    <div className="ImgCont">
      <div className="closeUser">&times;</div>
      <div className="imgCont">
        <img
          className="statusImages"
          src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=676&q=80"
          alt=""
        />
        <div className="caption">
        text about the image
        text about the image
        text about the image
        text about the image
        </div>
      </div>
    </div>
  );
}
