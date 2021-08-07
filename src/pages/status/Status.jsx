import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { showStatusDialog } from "../../redux/actions";
import Slider from "../../components/others/slider";
import "./status.css";

export default function Status() {
  const dispatch = useDispatch();
  const statusD = useSelector((state) => state.settings.showStatusDialog);

  const handleClick = () => dispatch(showStatusDialog(false));

  return (
    <div className={`ImgCont ${!statusD ? "show" : ""}`}>
      <div className="closeUser closeStatus" onClick={handleClick}>
        <span className="closeStatusClo">&times;</span>
      </div>
      <div className="imgCont">
        <Slider images={null} status={true} />
      </div>
    </div>
  );
}
