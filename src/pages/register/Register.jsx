import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import ErrorIcon from "@material-ui/icons/Error";

import Spinner from "../../components/others/spinner";
import "./register.css";

import { register, clearError } from "../../redux/actions";
import RegisterGoogle from "../../components/google/Register";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [picture, setPicture] = useState();
  const [disPicture, setDisPicture] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.myData);
  const error = useSelector((state) => state.users.error);

  useEffect(() => {
    if (user)
      if (Object.keys(user).length !== 0 && user.constructor === Object) {
        history.push("/login");
      }
  }, [user, history]);

  const handleFileChange = (e) => {
    if (e.target.files[0]) setPicture(e.target.files[0]);
    if (e.target.files[0])
      setDisPicture(URL.createObjectURL(e.target.files[0]));
    if (e.target.files[0]) setIsLoading(true);
  };

  const handleSubmit = (e) => {
    dispatch(clearError());
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    data.append("image", picture);
    dispatch(register(data));
  };
  return (
    <>
      {/* <div className="RegisterContainerImage"></div> */}
      <div className="RegisterContainer">
        <div className="RegisterInnerContainer">
          <div className="RegisterLeftContainer"></div>
          <div className="RegisterRightContainerR">
            <div className="RegisterRight">
              <form
                className="RegisterRightImageCont"
                onSubmit={(e) => handleSubmit(e)}
              >
                <div className="RegisterRightLogo">
                  <div className="RegisterRightText">Register</div>
                  <div className="Imgcont">
                    <img
                      className="RegisterRightImage"
                      src={
                        isLoading
                          ? disPicture
                          : "https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png"
                      }
                      alt={name}
                    />
                    <label
                      htmlFor="loadImage"
                      className="RegisterRightImage ontop"
                    />
                  </div>
                </div>
                <input
                  type="text"
                  className="RegisterInput"
                  placeholder="Name"
                  minLength="3"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
                <input
                  type="email"
                  className="RegisterInput"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <input
                  type="password"
                  className="RegisterInput"
                  placeholder="Password"
                  minLength="4"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <button type="submit" className="submitForm">
                  <div className="btncontent">Submit</div>
                  {loading ? (
                    error !== 500 ? (
                      <Spinner className="regSpinnercon" />
                    ) : (
                      <ErrorIcon className="errorIcon" />
                    )
                  ) : null}
                </button>
                <span className="or">or</span>
                <RegisterGoogle />
                <div className="RegisterInfo">
                  <Link to="/login" className="RegisterLogin">
                    already have an account login instead
                  </Link>
                  <p className="RegisterCondi">terms and conditions</p>
                  <input
                    type="file"
                    id="loadImage"
                    name="file"
                    onChange={(e) => handleFileChange(e)}
                    style={{ visibility: "hidden" }}
                    accept="image/*"
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="RegisterLeftContainer"></div>
        </div>
      </div>
    </>
  );
}
