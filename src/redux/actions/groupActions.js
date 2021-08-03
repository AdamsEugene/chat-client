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

export const current_Group = (id) => {
  return {
    type: ActionType.CURRENT_GROUP,
    payload: id,
  };
};
