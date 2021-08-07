import { ActionType } from "../configs/actionType";
import { instance } from "../configs/instance";

export const user_Group = (accessToken) => async (dispatch) => {
  try {
    const groups = await instance(accessToken).get("/api/users/groups");
    dispatch({ type: ActionType.FETCH_USER_GROUPS, payload: groups.data });
  } catch (_err) {}
};

export const create_Group = (accessToken, data) => async (dispatch) => {
  try {
    const groups = await instance(accessToken).post("/api/groups", data);
    dispatch({ type: ActionType.CREATE_GROUP, payload: groups.data });
  } catch (_err) {}
};

export const group_Members = (accessToken, id) => async (dispatch) => {
  try {
    const groups = await instance(accessToken).get(`/api/groups/members/${id}`);
    dispatch({ type: ActionType.GROUP_MEMBERS, payload: groups.data });
  } catch (_err) {}
};

export const send_Group_Message = (accessToken, data) => async (dispatch) => {
  try {
    const groups = await instance(accessToken).post(`/api/groupMessages`, data);
    dispatch({ type: ActionType.SEND_GROUP_MESSAGE, payload: groups.data });
  } catch (_err) {}
};

export const get_Group_Message = (accessToken, groupId) => async (dispatch) => {
  try {
    const groups = await instance(accessToken).get(
      `/api/groupMessages/${groupId}`
    );
    dispatch({ type: ActionType.ALL_GROUP_MESSAGE, payload: groups.data });
  } catch (_err) {}
};

export const receive_Group_Message_Socket = (data) => {
  return { type: ActionType.RECEIVE_GROUP_MESSAGE_SOCKET, payload: data };
};

export const send_Group_Message_Socket = (data) => {
  return { type: ActionType.SEND_GROUP_MESSAGE_SOCKET, payload: data };
};


export const current_Group = (id) => {
  return {
    type: ActionType.CURRENT_GROUP,
    payload: id,
  };
};

export const my_Current_Group_Chat = (id) => {
  return {
    type: ActionType.MY_CURRENT_GROUP_CHAT,
    payload: id,
  };
};

export const group_Members_Local = (id) => {
  return {
    type: ActionType.GROUP_MEMBERS_LOCAL,
    payload: id,
  };
};

export const active_Groups = (id) => {
  return {
    type: ActionType.ACTIVE_GROUPS,
    payload: id,
  };
};
