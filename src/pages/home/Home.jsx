import React, { useState } from "react";
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
import Table from "../../components/others/Table";
import "./home.css";

export default function Home() {
  const user = useSelector((state) => state.users.myData);
  const currentGroup = useSelector((state) => state.groups.currentGroup);
  const currentUser = useSelector((state) => state.users.currentUser);

  const [members, setMembers] = useState([]);

  const tavleData = (data) => setMembers([...data]);

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
              {currentUser && Object.keys(currentUser).length !== 0 && (
                <Status />
              )}

              {currentGroup && Object.keys(currentGroup).length !== 0 && (
                <Table tavleData={(data) => tavleData(data)} />
              )}
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
