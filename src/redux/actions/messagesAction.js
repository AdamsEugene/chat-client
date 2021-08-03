import { ActionType } from "../configs/actionType";
import { instance } from "../configs/instance";

export const our_Chat = (myId, yourId) => {
  return { type: ActionType.OUR_CHAT, payload: { myId, yourId } };
};

export const send_Message = (accessToken, data) => async (dispatch) => {
  try {
    const message = await instance(accessToken).post(`/api/messages`, data);
    dispatch({ type: ActionType.SEND_MESSAGE, payload: message.data });
  } catch (_err) {}
};

export const send_Message_Socket = (data) => {
  return { type: ActionType.SEND_MESSAGE_SOCKET, payload: data };
};

export const all_My_Message = (accessToken) => async (dispatch) => {
  try {
    const message = await instance(accessToken).get(`/api/messages`);
    dispatch({ type: ActionType.ALL_MY_MESSAGE, payload: message.data });
  } catch (_err) {}
};

export const delete_From_Me = (accessToken, id, data) => async (dispatch) => {
  try {
    const message = await instance(accessToken).put(
      `/api/messages/delme/${id}`,
      data
    );
    dispatch({ type: ActionType.DELETE_FROM_ME, payload: message.data });
  } catch (_err) {}
};

export const set_Seen = (accessToken, id) => async (dispatch) => {
  try {
    const message = await instance(accessToken).put(`/api/messages/seen/${id}`);
    dispatch({ type: ActionType.SET_SEEN, payload: message.data });
  } catch (_err) {}
};

export const updatad_Message = () => {
  return { type: ActionType.UPDATED_MESSAGE };
};
