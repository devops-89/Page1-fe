import { configureStore,combineReducers } from "@reduxjs/toolkit";


import flightReducer from "../reducers/flight";
import userReducer from "../reducers/userReducer";
import toastReducer from "../reducers/toastReducer";

const rootReducer=combineReducers({
  USER:userReducer,
  Toast:toastReducer,
  Flight:flightReducer
})

export default configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }), 
  reducer: rootReducer
 
});
