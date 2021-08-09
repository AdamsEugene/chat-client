import { ActionType } from "../configs/actionType";

const initialState = {
  users: [],
  myData: JSON.parse(localStorage.getItem("myData")) || {},
  currentUser: {},
  friends: [],
  error: 0,
  activeUsers: ["none"],
  searchResults: [],
  searchFriends: [],
};

export const userRrducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REGISTERING:
      return state;

    case ActionType.REGISTERING_SUCCESS:
      return { ...state, myData: action.payload };

    case ActionType.REGISTERING_FAILURE:
      return { state, error: action.payload };

    case ActionType.LOGOUT:
      return { state, myData: {} };

    case ActionType.CLEAR_ERROR:
      return { state, error: 0 };

    case ActionType.FETCH_ALL_USERS:
      return { ...state, users: action.payload };

    case ActionType.ACTIVE_USERS:
      if (state.activeUsers) {
        if (state.activeUsers.length > 0) {
          return {
            ...state,
            activeUsers: [...state.activeUsers, ...action.payload],
          };
        }
        return {
          ...state,
          activeUsers: [...action.payload],
        };
      }
      return {
        ...state,
        activeUsers: [...action.payload],
      };

    case ActionType.USER_LEFT:
      return {
        ...state,
        activeUsers: action.payload,
      };

    case ActionType.CURRENT_USER:
      return {
        ...state,
        currentUser:
          state.users.find((user) => user._id === action.payload) || {},
      };

    case ActionType.SEARCH_USER:
      return {
        ...state,
        searchResults:
          state.users &&
          state.users.filter((user) =>
            user?.name?.toLowerCase().includes(action.payload.toLowerCase())
          ),
      };

    case ActionType.SEARCH_FRIEND:
      return {
        ...state,
        searchFriends:
          state.friends &&
          state.friends.filter((user) =>
            user?.name?.toLowerCase().includes(action.payload.toLowerCase())
          ),
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
