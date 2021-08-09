import axios from "axios";

export const instance = (accessToken) => {
  return axios.create({
    baseURL: "https://chat-apa.herokuapp.com/",
    // timeout: 1000,
    withCredentials: false,
    headers: {
      "Access-Control-Allow-Origin": "https://chat-apa.herokuapp.com/",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      token: accessToken ? "bearer " + accessToken : "bearer token",
    },
  });
};
