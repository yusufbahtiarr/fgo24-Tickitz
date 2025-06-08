import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import users from "./users";
import auths from "./auths";
import tickets from "./tickets";
import subscribes from "./subscribes";
import films from "./films";

const persistUser = {
  key: "users",
  storage,
};
const persistAuth = {
  key: "auths",
  storage,
};
const persistTicket = {
  key: "tickets",
  storage,
};
const persistSubscribe = {
  key: "subscribes",
  storage,
};
const persistFilm = {
  key: "films",
  storage,
};

const reducer = combineReducers({
  users: persistReducer(persistUser, users),
  auths: persistReducer(persistAuth, auths),
  tickets: persistReducer(persistTicket, tickets),
  subscribes: persistReducer(persistSubscribe, subscribes),
  films: persistReducer(persistFilm, films),
});

export default reducer;
