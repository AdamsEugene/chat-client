import axios from "axios";

export const instance = (accessToken) => {
  return axios.create({
    baseURL: "http://localhost:9000/",
    // timeout: 1000,
    withCredentials: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      token: accessToken ? "bearer " + accessToken : "bearer token",
    },
  });
};
