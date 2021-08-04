import { ActionType } from "../configs/actionType";
import { reorder } from "../configs/reorderData";

const initialState = {
  messages: [],
  ourChat: [],
  mgs: {},
};

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SEND_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    case ActionType.SEND_MESSAGE_SOCKET:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    case ActionType.ALL_MY_MESSAGE:
      return { ...state, messages: action.payload };

    case ActionType.OUR_CHAT:
      return {
        ...state,
        ourChat:
          state.messages.length > 0
            ? reorder(
                state.messages
                  .filter(
                    (message) =>
                      (message.sender === action.payload.myId ||
                        message.receiver === action.payload.myId) &&
                      (message.sender === action.payload.yourId ||
                        message.receiver === action.payload.yourId)
                  )
                  .map((chat) => {
                    if (chat._id === state.mgs._id) {
                      return state.mgs;
                    } else {
                      return chat;
                    }
                  })
              )
            : [],
      };

    case ActionType.RECEIVED_MESSAGE:
      return {
        ...state,
        ourChat:
          state.messages.length > 0
            ? reorder(
                state.messages.filter(
                  (message) =>
                    (message.sender === action.payload.myId ||
                      message.receiver === action.payload.myId) &&
                    (message.sender === action.payload.yourId ||
                      message.receiver === action.payload.yourId)
                )
              )
            : [],
      };

    case ActionType.DELETE_FROM_ME:
      if ("sender" in action ? action.payload : {}) {
        return { ...state, mgs: action.payload };
      } else {
        return state;
      }

    case ActionType.SET_SEEN:
      if ("sender" in action ? action.payload : {}) {
        return { ...state, mgs: action.payload };
      } else {
        return state;
      }

    case ActionType.LOCAL_SEEN:
      return { ...state, mgs: action.payload };

    case ActionType.UPDATED_MESSAGE:
      return {
        ...state,
        messages: state.messages.map((chat) => {
          if (chat._id === state.mgs._id) {
            return state.mgs;
          } else {
            return chat;
          }
        }),
      };

    default:
      return state;
  }
};
