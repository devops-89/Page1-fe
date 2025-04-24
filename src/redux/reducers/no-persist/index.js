import { combineReducers } from "@reduxjs/toolkit";
import guestAdditionSliceReducer from "../no-persist-reducers/GuestAdditionSlice";

const noPersistReducer=combineReducers({
    GUESTADDITION:guestAdditionSliceReducer
})

export default noPersistReducer;