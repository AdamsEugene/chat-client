import { ActionType } from "../configs/actionType";

const initialState = {
  users: [],
  myData: {},
  currentUser: {},
  friends: [],
  error: 0,
};

export const userRrducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REGISTERING:
      return state;

    case ActionType.REGISTERING_SUCCESS:
      return { ...state, myData: action.payload };

    case ActionType.REGISTERING_FAILURE:
      return { state, error: action.payload };

    case ActionType.CLEAR_ERROR:
      return { state, error: 0 };

    case ActionType.FETCH_ALL_USERS:
      return { ...state, users: action.payload };

    case ActionType.CURRENT_USER:
      return {
        ...state,
        currentUser: state.users.find((user) => user._id === action.payload),
      };

    case ActionType.FETCH_ALL_FRIENDS:
      return { ...state, friends: action.payload };

    case ActionType.UPDATE_USER_INFO:
      return { ...state, myData: action.payload };

    case ActionType.UPDATE_USER_PROFILE_PIC:
      return { ...state, myData: action.payload };

    case ActionType.ADD_FRIEND:
      return {
        ...state,
        myData: action.payload,
        friends: state.users.filter((friend) =>
          action.payload.friends.includes(friend._id)
        ),
      };

    case ActionType.ALL_FRIENDS:
      return { ...state, friends: state.friends };

    case ActionType.BLOCK_USER:
      return { ...state, myData: action.payload };
    default:
      return state;
  }
};
