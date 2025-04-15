import { combineReducers } from "@reduxjs/toolkit";
import hotelListReducer from "../hotel-reducers/HotelList";

const hotelReducer=combineReducers({
  HotelList:hotelListReducer
});

export default hotelReducer;