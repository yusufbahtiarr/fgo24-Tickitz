import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import users from "./users";
import subscribes from "./subscribes";

const persistUser = {
  key: "users",
  storage,
};
const persistSubscribe = {
  key: "subscribes",
  storage,
};

const reducer = combineReducers({
  users: persistReducer(persistUser, users),
  subscribes: persistReducer(persistSubscribe, subscribes),
});

export default reducer;
