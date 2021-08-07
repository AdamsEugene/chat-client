import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { showSettingsDialog, settingsBackground } from "../../redux/actions";
import "./settings.css";

export default function Settings() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings.showSettingsDialog);
  const user = useSelector((state) => state.users.myData);
  const backgroungImage = useSelector(
    (state) => state.settings.backgroundImage
  );

  const handleClick = () => dispatch(showSettingsDialog(false));

  const [disPicture, setDisPicture] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleChang = (e) => {
    e.preventDefault();
    setIsLoading(true); 
    if (e.target.files[0])
      setDisPicture(URL.createObjectURL(e.target.files[0]));
    const data = new FormData();
    data.append("image", e.target.files[0] ? e.target.files[0] : null);
    if (e.target.files[0]) dispatch(settingsBackground(user.accessToken, data));
  };

  const saveChanges = () => handleClick();

  return (
    <div className={`settingsCont ${!settings ? "show" : ""}`}>
      <div className="userHeader">
        <div className="userL">Settings</div>
        <div className="userR">
          <div className="closeUser" onClick={handleClick}>
            &times;
          </div>
        </div>
      </div>
      <div className="settings">
        <div className="settingsImg">
          <img
            className="settingsRightImage"
            src={
              isLoading
                ? disPicture
                : backgroungImage
                ? `data:${backgroungImage.backgroudImage.contentType};base64,${backgroungImage.backgroudImage.image}`
                : null
            }
            alt=""
          />
        </div>
        <label htmlFor="settingsInput" className="settingbtn">
          <span className="settingbtntxt">Upload image</span>
        </label>
        <div className="settingbtn done" onClick={saveChanges}>
          <span className="settingbtntxt">Save changes</span>
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
        id="settingsInput"
        onChange={(e) => handleChang(e)}
        style={{ visibility: "hidden", display: "none" }}
      />
    </div>
  );
}
