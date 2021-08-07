import { ActionType } from "../configs/actionType";
import { instance } from "../configs/instance";

export const show_User_Dialog = (status) => {
  return {
    type: ActionType.USER_DIALOG,
    payload: status,
  };
};

export const show_Settings_Dialog = (status) => {
  return {
    type: ActionType.SETTINGS_DIALOG,
    payload: status,
  };
};

export const show_Group_Dialog = (status) => {
  return {
    type: ActionType.GROUP_DIALOG,
    payload: status,
  };
};

export const show_Status_Dialog = (status) => {
  return {
    type: ActionType.STATUS_DIALOG,
    payload: status,
  };
};


export const settings_Background = (accessToken, image) => async (dispatch) => {
  try {
    const groups = await instance(accessToken).post(`/api/settings`, image);
    dispatch({ type: ActionType.SETTINGS_BACK_GROUND, payload: groups.data });
  } catch (_err) {}
};

export const refresh_Background_Image = (accessToken) => async (dispatch) => {
  try {
    const groups = await instance(accessToken).get(`/api/settings`);
    dispatch({ type: ActionType.SETTINGS_BACK_GROUND, payload: groups.data });
  } catch (_err) {}
};

export const set_count_to_zero = () => {
  return { type: ActionType.SET_COUNT_TO_ZERO };
};

export const set_count = (count) => {
  return { type: ActionType.SET_COUNT, payload: count };
};

export const connect_To_Socket = () => {
  return { type: ActionType.CONNECT_SOCKET };
};
