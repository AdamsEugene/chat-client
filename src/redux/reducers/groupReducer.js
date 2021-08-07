import { ActionType } from "../configs/actionType";
import { reorder } from "../configs/reorderData";

const initialState = {
  currentGroup: {},
  groups: [],
  activeGroups: [],
  members: [],
  membersLocal: [],
  group: {},
  messages: [],
  currentGroupChat: [],
};

export const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.FETCH_USER_GROUPS:
      return { ...state, groups: action.payload };

    case ActionType.GROUP_MEMBERS:
      return { ...state, members: [...state.members, ...action.payload] };

    case ActionType.SEND_GROUP_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload] };

    case ActionType.SEND_GROUP_MESSAGE_SOCKET:
      return { ...state, messages: [...state.messages, action.payload] };

    case ActionType.ALL_GROUP_MESSAGE:
      return { ...state, messages: [...state.messages, ...action.payload] };

    case ActionType.MY_CURRENT_GROUP_CHAT:
      return {
        ...state,
        currentGroupChat:
          state.messages.length > 0 &&
          reorder(
            state.messages.filter(
              (message) => message.groupId === action.payload
            )
          ),
      };

    case ActionType.RECEIVE_GROUP_MESSAGE_SOCKET:
      return {
        ...state,
        currentGroupChat:
          state.messages.length > 0 &&
          reorder(
            state.messages.filter(
              (message) => message.groupId === action.payload
            )
          ),
      };

    case ActionType.GROUP_MEMBERS_LOCAL:
      return {
        ...state,
        membersLocal: state.members.filter((m) => m.gId === action.payload),
      };

    case ActionType.CREATE_GROUP:
      return {
        ...state,
        group: action.payload,
        groups: [...state.groups, action.payload],
      };

    case ActionType.CURRENT_GROUP:
      return {
        ...state,
        currentGroup:
          state.groups.find((group) => group._id === action.payload) || {},
      };

    case ActionType.ACTIVE_GROUPS:
      return {
        ...state,
        activeGroups: !state.activeGroups.some(
          (group) => group === action.payload
        )
          ? [...state.activeGroups, action.payload]
          : [...state.activeGroups],
      };

    default:
      return state;
  }
};
