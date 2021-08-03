import { ActionType } from "../configs/actionType";

const initialState = {
  currentGroup: {},
  groups: [],
  group: {},
};

export const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.FETCH_USER_GROUPS:
      return { ...state, groups: action.payload };

    case ActionType.CREATE_GROUP:
      return {
        ...state,
        group: action.payload,
        groups: [...state.groups, action.payload],
      };

    case ActionType.CURRENT_GROUP:
      return {
        ...state,
        currentUser: state.groups.find((group) => group._id === action.payload),
      };

    default:
      return state;
  }
};
