import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PublishIcon from "@material-ui/icons/Publish";

import "./user.css";
import RadioButtons from "../../components/others/Radio";
import {
  showUserDialog,
  updateUser,
  updateUserProfilePic,
} from "../../redux/actions";

import Slider from "../../components/others/imageSlider";

export default function User() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings.showUserDialog);
  const user = useSelector((state) => state.users.myData);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState();
  const [status, setStatus] = useState();
  const [pics, setPics] = useState([]);
  const [newPics, setNewPics] = useState([]);
  const [pic, setPic] = useState("");

  useEffect(() => {
    user ? setName(user.name) : setName();
    user ? setEmail(user.email) : setEmail();
    user ? setPassword(user.password) : setPassword();
    user ? setCpassword(user.password) : setCpassword();
    user ? setStatus(user.status) : setStatus();
    user ? setPics(user.statusPics) : setPics();
  }, [user]);

  const handleClick = () => dispatch(showUserDialog(false));

  const handleInputChange = (e) => {
    if (e.target.files[0]) setNewPics(e.target.files);
    if (e.target.files[0]) setPics([...pics, ...e.target.files]);
  };

  const handleUloadChange = (e) => {
    if (e.target.files[0]) setPic(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    if (newPics.length > 0) {
      // Upload Status Images
    }
    if (pic !== "") {
      // Upload Status Images
      let data = new FormData();
      data.append("image", pic);
      if (Object.keys(user).length !== 0)
        dispatch(updateUserProfilePic(user.accessToken, user._id, data));
    }
    if (!password) {
      //Updata user without password
      let data = {};
      if (user.name !== name) data.name = name;
      if (user.status !== parseInt(status)) data.status = parseInt(status);
      if (user.email !== email) data.email = email;
      if (Object.keys(user).length !== 0 && Object.keys(data).length !== 0)
        dispatch(updateUser(user.accessToken, user._id, data));
    } else if (password && cpassword === password) {
      // Update user
      let data = {};
      data.password = password;
      if (user.name !== name) data.name = name;
      if (user.status !== parseInt(status)) data.status = parseInt(status);
      if (user.email !== email) data.email = email;
      if (Object.keys(user).length !== 0 && Object.keys(data).length !== 0)
        dispatch(updateUser(user.accessToken, user._id, data));
    }
    handleClick();
  };
  // console.log(name, user.name, user.accessToken);
  return (
    <div className={`userCont ${settings ? "" : " visible"}`}>
      <div className="userHeader">
        <div className="userL">Update Profile</div>
        <div className="userR">
          <div className="closeUser" onClick={handleClick}>
            &times;
          </div>
        </div>
      </div>
      <div className="userBody">
        <form className="userForm">
          <div className="userBodyL">
            <input
              type="text"
              className="RegisterInput user"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
            <input
              type="text"
              className="RegisterInput user"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              type="text"
              className="RegisterInput user"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <input
              type="text"
              className="RegisterInput user"
              value={password}
              onChange={(e) => setCpassword(e.target.value)}
              placeholder="Confirm password"
            />
            <div className="statusCo">
              <div className="statusU">Status</div>
              <RadioButtons status={status} setSelectedValue={setStatus} />
            </div>
          </div>
          <div className="userBodyR">
            <div className="userImage">
              <img
                className="RegisterRightImage"
                src={
                  pic
                    ? URL.createObjectURL(pic)
                    : user &&
                      Object.keys(user).length !== 0 &&
                      user.profilePics.length > 0
                    ? `data:${user.profilePics[0].contentType};base64,${user.profilePics[0].image}`
                    : "https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png"
                }
                alt=""
              />
              <label htmlFor="uplStatuss" className="upload">
                <PublishIcon className="uploadIcon" />
              </label>
            </div>
            <div className="uploadStatus">
              <div className="uploadedStatus">
                <Slider images={pics ? [...pics] : null} />
              </div>
              <label htmlFor="uploadStatuss" className="uploadButton">
                <PublishIcon />
              </label>
            </div>
            <div className="done" onClick={(e) => handleSubmit(e)}>
              Save changes
            </div>
          </div>
          <input
            type="file"
            id="uploadStatuss"
            style={{ visibility: "hidden", display: "none" }}
            accept="image/*"
            multiple
            onChange={(e) => handleInputChange(e)}
          />
          <input
            type="file"
            id="uplStatuss"
            style={{ visibility: "hidden", display: "none" }}
            accept="image/*"
            multiple
            onChange={(e) => handleUloadChange(e)}
          />
        </form>
      </div>
    </div>
  );
}
