import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { showGroupDialog, createNewGroup } from "../../redux/actions";
import Table from "../../components/others/Table";
import "./group.css";

export default function Group() {
  const dispatch = useDispatch();
  const dialog = useSelector((state) => state.settings.showGroupsDialog);
  const me = useSelector((state) => state.users.myData);
  const socket = useSelector((state) => state.settings.socket);

  const [image, setImage] = useState();
  const [load, setLoad] = useState(false);
  const [name, setName] = useState("");
  const [disc, setDisc] = useState();
  const [uploadImd, setUploadImd] = useState();
  const [members, setMembers] = useState([]);

  const handleClick = () => dispatch(showGroupDialog(false));

  const handleFileChange = (e) => {
    if (e.target.files[0]) setLoad(true);
    if (e.target.files[0]) setUploadImd(e.target.files[0]);
    if (e.target.files[0]) setImage(URL.createObjectURL(e.target.files[0]));
  };

  const tavleData = (data) => setMembers([...data]);

  const createGroup = () => {
    if (name !== "") {
      const allMem = [...members, me._id];
      const data = new FormData();
      data.append("name", name);
      if (disc) data.append("dics", disc);
      allMem.forEach((member) => {
        data.append("members", member);
      });
      // if (members.length > 0) data.append("members", members);
      data.append("admins", [me._id]);
      if (image) data.append("groupPics", uploadImd);
      dispatch(createNewGroup(me.accessToken, data));
      socket.emit("join group", name);
    }
    handleClick();
  };

  return (
    <div className={`groupsCont ${dialog ? "" : " show"}`}>
      <div className="userHeader">
        <div className="userL">Create New Group</div>
        <div className="userR">
          <div className="closeUser" onClick={handleClick}>
            &times;
          </div>
        </div>
      </div>
      <div className="groupBody">
        <div className="groupBodyLeft">
          <label htmlFor="groupImageLoad" className="groupAvatal">
            {load ? "" : ""}
            <img className="groupAvatal image" src={load ? image : ""} alt="" />
          </label>
          <div className="groupName">
            <input
              type="text"
              className="RegisterInput inputGroup"
              placeholder="Enter group name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="groupName">
            <textarea
              className="RegisterInput inputGroup textGroup"
              placeholder="Some info about this group"
              rows={4}
              value={disc}
              onChange={(e) => setDisc(e.target.value)}
            />
          </div>
          <input
            type="file"
            id="groupImageLoad"
            style={{ visibility: "hidden", display: "none" }}
            onChange={(e) => handleFileChange(e)}
          />
        </div>
        <div className="groupBodyRight">
          <div className="userstable">
            <Table tavleData={(data) => tavleData(data)} create={true} />
          </div>
          <div className="done createG" onClick={createGroup}>
            Create
          </div>
        </div>
      </div>
    </div>
  );
}
