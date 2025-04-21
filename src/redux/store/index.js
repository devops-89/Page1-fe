import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import createIndexedDBStorage from "redux-persist-indexeddb-storage";

import flightReducer from "../reducers/flight";
import userReducer from "../reducers/userReducer";
import toastReducer from "../reducers/toastReducer";
import hotelReducer from "../reducers/hotel";
import modalReducer from "../reducers/modal";
import destinationReducer from "../reducers/destinationWedding";
const storage = createIndexedDBStorage("TRDB");

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["HOTEL"],
};

const rootReducer = combineReducers({
  USER: userReducer,
  Toast: toastReducer,
  Flight: flightReducer,
  HOTEL: hotelReducer,
  modal: modalReducer,
  destinationWedding: destinationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
