import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Appbar from "../../components/others/Appbar";
import ChatArea from "../../components/messages/ChatArea";
import Status from "../../components/users/Status";
import TextInput from "../../components/messages/TextInput";
import User from "../../components/users/User";
import Userinfor from "../../components/users/Userinfor";
import Taps from "../../components/others/Taps";
import Groups from "../../components/groups/groups";
import "./home.css";

export default function Home() {
  const user = useSelector((state) => state.users.myData);

  return Object.keys(user).length !== 0 && user.constructor === Object ? (
    <div className="homeCont">
      <User />
      <div className="homeCenter">
        <Appbar />
        <div className="homeContent">
          <ChatArea />
          <TextInput />
        </div>
      </div>
      <div className="homeRight">
        <Taps
          Users={
            <Userinfor>
              <Status />
            </Userinfor>
          }
          user={"About User"}
          friend="Groups"
          Friends={<Groups />}
        />
      </div>
    </div>
  ) : (
    <Redirect to={{ pathname: "/login" }} />
  );
}
