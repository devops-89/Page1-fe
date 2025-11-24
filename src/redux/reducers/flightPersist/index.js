
import flightStateReducer from "../flightState";
import { combineReducers } from "@reduxjs/toolkit";
const flightPersistReducer = combineReducers({
  FlightState: flightStateReducer,
});

export default flightPersistReducer;
