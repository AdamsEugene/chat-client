import { combineReducers } from "redux";
import { userRrducer } from "../reducers/userReducer";
import { groupReducer } from "../reducers/groupReducer";
import { settingsReducer } from "../reducers/settingsReducer";
import { messagesReducer } from "../reducers/messagesReducer";

const rootReducer = combineReducers({
  users: userRrducer,
  groups: groupReducer,
  settings: settingsReducer,
  messages: messagesReducer,
});

export default rootReducer;
