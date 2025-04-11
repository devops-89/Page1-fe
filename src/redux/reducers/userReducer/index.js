import { combineReducers } from "@reduxjs/toolkit";
import userRootReducer from "../user";


const userReducer=combineReducers({
    UserData:userRootReducer
})

export default userReducer;