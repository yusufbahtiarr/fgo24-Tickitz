import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import users from "./users";

const persistUser = {
  key: "users",
  storage,
};

const reducer = combineReducers({
  users: persistReducer(persistUser, users),
});

export default reducer;
