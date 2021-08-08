import React from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";

import { register } from "../../redux/actions";

import "./google.css";

export default function RegisterGoogle() {
  const dispatch = useDispatch();
  const responseGoogle = (response) => {
    let data = {
      name: response.Os.Ne,
      email: response.Os.zt,
      type: "google",
    };
    dispatch(register(data));
  };
  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_CLIENT_ID}
      buttonText="Register with google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
      className="GoogleLogin"
    />
  );
}
