import { combineReducers } from "@reduxjs/toolkit";
import toastSlice from "../toast";

const toastRootReducer=combineReducers({
    ToastMessages: toastSlice
})

export default toastRootReducer;