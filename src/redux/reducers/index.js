import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import users from "./users";
import auths from "./auths";
import subscribes from "./subscribes";

const persistUser = {
  key: "users",
  storage,
};
const persistAuth = {
  key: "auths",
  storage,
};
const persistSubscribe = {
  key: "subscribes",
  storage,
};

const reducer = combineReducers({
  users: persistReducer(persistUser, users),
  auths: persistReducer(persistAuth, auths),
  subscribes: persistReducer(persistSubscribe, subscribes),
});

export default reducer;
