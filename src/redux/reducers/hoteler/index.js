import { combineReducers } from "@reduxjs/toolkit";

import hotelerHotelListReducer from "../hoteler-reducers/HotelerHotelList";

const hotelerReducer = combineReducers({
  HotelerHotelList: hotelerHotelListReducer,
});

export default hotelerReducer;
