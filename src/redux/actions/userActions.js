import { ActionType } from "../configs/actionType";
import { instance } from "../configs/instance";

export const registerUser = (data) => async (dispatch) => {
  dispatch({ type: ActionType.REGISTERING });
  try {
    const user = await instance().post("/api/auth/register", data);

    dispatch({ type: ActionType.REGISTERING_SUCCESS, payload: user.data });
  } catch (_err) {
    dispatch({ type: ActionType.REGISTERING_FAILURE, payload: 500 });
  }
};

export const loginUser = (data) => async (dispatch) => {
  dispatch({ type: ActionType.REGISTERING });
  try {
    const user = await instance().post("/api/auth/login", data);
    dispatch({ type: ActionType.REGISTERING_SUCCESS, payload: user.data });
  } catch (_err) {
    dispatch({ type: ActionType.REGISTERING_FAILURE, payload: 500 });
  }
};

export const allUser = (accessToken) => async (dispatch) => {
  try {
    const user = await instance(accessToken).get("/api/users/all");
    dispatch({ type: ActionType.FETCH_ALL_USERS, payload: user.data });
  } catch (_err) {}
};

export const user_Friends = (accessToken) => async (dispatch) => {
  try {
    const user = await instance(accessToken).get("/api/users/friends");
    dispatch({ type: ActionType.FETCH_ALL_FRIENDS, payload: user.data });
  } catch (_err) {}
};

export const update_User = (accessToken, userId, data) => async (dispatch) => {
  try {
    const user = await instance(accessToken).put(`/api/users/${userId}`, data);
    dispatch({ type: ActionType.UPDATE_USER_INFO, payload: user.data });
  } catch (_err) {}
};

export const update_User_Profile_Pic =
  (accessToken, userId, data) => async (dispatch) => {
    try {
      const user = await instance(accessToken).put(
        `/api/users/profilepic/${userId}`,
        data
      );
      dispatch({
        type: ActionType.UPDATE_USER_PROFILE_PIC,
        payload: user.data,
      });
    } catch (_err) {}
  };

export const current_User = (id) => {
  return {
    type: ActionType.CURRENT_USER,
    payload: id,
  };
};

export const active_Users = (data) => {
  return {
    type: ActionType.ACTIVE_USERS,
    payload: data,
  };
};

export const user_Left = (data) => {
  return {
    type: ActionType.USER_LEFT,
    payload: data,
  };
};

export const search_User = (name) => {
  return {
    type: ActionType.SEARCH_USER,
    payload: name,
  };
};

export const search_Friend = (name) => {
  return {
    type: ActionType.SEARCH_FRIEND,
    payload: name,
  };
};

export const all_Friends = () => {
  return { type: ActionType.ALL_FRIENDS };
};

export const add_Friend = (accessToken, id) => async (dispatch) => {
  try {
    const user = await instance(accessToken).put(
      "/api/users/addfriend/new",
      id
    );
    dispatch({ type: ActionType.ADD_FRIEND, payload: user.data });
  } catch (_err) {}
};

export const block_user = (accessToken, id) => async (dispatch) => {
  try {
    const user = await instance(accessToken).put(
      "/api/users/blockuser/someone",
      id
    );
    dispatch({ type: ActionType.BLOCK_USER, payload: user.data });
  } catch (_err) {}
};

export const clear_Error = () => {
  return { type: ActionType.CLEAR_ERROR };
};

export const Logout = () => {
  return { type: ActionType.LOGOUT };
};
