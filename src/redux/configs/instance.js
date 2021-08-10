import axios from "axios";

export const instance = (accessToken) => {
  return axios.create({
    baseURL: "https://chat-apa.herokuapp.com",
    // baseURL: "http://localhost:9000/",
    // timeout: 1000,
    withCredentials: false,
    headers: {
      "Access-Control-Allow-Origin": "https://chat-apa.herokuapp.com",
      // "Access-Control-Allow-Origin": "http://localhost:9000/",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      token: accessToken ? "bearer " + accessToken : "bearer token",
    },
  });
};
