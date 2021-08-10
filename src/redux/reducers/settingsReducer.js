import { ActionType } from "../configs/actionType";
import { io } from "socket.io-client";

const initialState = {
  showUserDialog: false,
  showSettingsDialog: false,
  showGroupsDialog: false,
  showStatusDialog: false,
  backgroundImage: "",
  count: 0,
  socket: null,
};

export const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.USER_DIALOG:
      return { ...state, showUserDialog: action.payload };

    case ActionType.SETTINGS_DIALOG:
      return { ...state, showSettingsDialog: action.payload };

    case ActionType.GROUP_DIALOG:
      return { ...state, showGroupsDialog: action.payload };

    case ActionType.STATUS_DIALOG:
      return { ...state, showStatusDialog: action.payload };

    case ActionType.SETTINGS_BACK_GROUND:
      return { ...state, backgroundImage: action.payload };

    case ActionType.SET_COUNT_TO_ZERO:
      return { ...state, count: 0 };

    case ActionType.SET_COUNT:
      return { ...state, count: action.payload };

    case ActionType.CONNECT_SOCKET:
      return {
        ...state,
        socket: io("https://chat-socket-apa.herokuapp.com/", {
          withCredentials: true,
        }),
      };

    default:
      return state;
  }
};
