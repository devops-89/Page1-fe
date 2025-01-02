import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/user";
import toastReducer from "../reducers/toast";

export default configureStore({
  reducer: {
    USER: userReducer,
    Toast: toastReducer,
  },
});
