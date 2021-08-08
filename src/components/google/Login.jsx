import React from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";

import { login } from "../../redux/actions";

import "./google.css";

export default function LoginGoogle() {
  const dispatch = useDispatch();
  const responseGoogle = (response) => {
    let data = {
      email: response.Os.zt,
      password: "google",
      type: "google",
    };

    dispatch(login(data));
  };

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_CLIENT_ID}
      buttonText="Login with google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
      className="GoogleLogin"
    />
  );
}
