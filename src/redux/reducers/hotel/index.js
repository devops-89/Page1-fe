import { combineReducers } from "@reduxjs/toolkit";
import hotelListReducer from "../hotel-reducers/HotelList";
import guestSliceReducer from "../hotel-reducers/GuestSlice";

const hotelReducer = combineReducers({
  HotelList: hotelListReducer,
  GuestList: guestSliceReducer,
});

export default hotelReducer;
