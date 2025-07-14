import { combineReducers } from "@reduxjs/toolkit";
import hotelListReducer from "../hotel-reducers/HotelList";
import guestSliceReducer from "../hotel-reducers/GuestSlice";
import hotelSearchDataReducer from "../hotel-reducers/HotelSearchData";

const hotelReducer = combineReducers({
  HotelList: hotelListReducer,
  GuestList: guestSliceReducer,
  HotelSearchData: hotelSearchDataReducer
});

export default hotelReducer;
