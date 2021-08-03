import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import ErrorIcon from "@material-ui/icons/Error";

import Spinner from "../../components/others/spinner";
import { login, clearError } from "../../redux/actions";
import "./login.css";

export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const user = useSelector((state) => state.users.myData);
  const error = useSelector((state) => state.users.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      if (Object.keys(user).length !== 0 && user.constructor === Object) {
        setImage(user.profilePics[0]);
        setPassword(user.password);
        setEmail(user.email);

        if (user.accessToken) {
          history.push("/");
        } else {
          history.push("/login");
        }
      }
    } else {
      history.push("/login");
    }
  }, [user, history]);

  const handleSubmit = (e) => {
    dispatch(clearError());
    e.preventDefault();
    if (email !== "" && password !== "") {
      setLoading(true);
      const data = new FormData();
      data.append("email", email);
      data.append("password", password);

      dispatch(login(data));
    }
    setPassword("");
  };

  return (
    <>
      {/* <div className="RegisterContainerImage"></div> */}
      <div className="RegisterContainer">
        <div className="RegisterInnerContainer">
          <div className="RegisterLeftContainer">
            <div className="RegisterLeftTextContainer">
              <div className="RegisterLeftText">
                <img
                  className="RegisterRightImage"
                  src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=676&q=80"
                  alt=""
                />
                <span className="RegisterLeftTextH1">
                  <h1 className="RegisterLeftH1">Instant Chat App</h1>
                </span>
                <span className="RegisterLeftdisc">Chat with anyone</span>
              </div>
            </div>
          </div>
          <div className="RegisterRightContainer">
            <div className="RegisterRight">
              <form className="RegisterRightImageCont">
                <div className="RegisterRightLogo">
                  <div className="RegisterRightText">Login</div>
                  <img
                    className="RegisterRightImage"
                    src={
                      image
                        ? `data:${image.contentType};base64,${image.image}`
                        : "https://www.irishrsa.ie/wp-content/uploads/2017/03/default-avatar.png"
                    }
                    alt=""
                  />
                </div>
                <input
                  type="email"
                  className="RegisterInput"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
                <input
                  type="password"
                  className="RegisterInput"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                <button
                  type="submit"
                  className="submitForm"
                  onClick={(e) => handleSubmit(e)}
                >
                  <div className="btncontent">Login</div>
                  {loading ? (
                    error !== 500 ? (
                      <Spinner className="regSpinnercon" />
                    ) : (
                      <ErrorIcon className="errorIcon" />
                    )
                  ) : null}
                </button>
                <div className="RegisterInfo">
                  <Link to="/register" className="RegisterLogin">
                    dom't have an account login instead
                  </Link>
                  <p className="RegisterCondi">terms and conditions</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
