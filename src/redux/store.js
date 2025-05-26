import { configureStore } from "@reduxjs/toolkit";

import reducer from "./reducers";
import persistStore from "redux-persist/es/persistStore";

//middleware
export const store = configureStore({
  reducer,
  middleware: (defaultMiddleware) => {
    return defaultMiddleware({
      serializableCheck: {
        ignoreActions: ["persist/PERSIST"],
      },
    });
  },
});

export const persistor = persistStore(store);
