import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/user";
import toastReducer from "../reducers/toast";
import travellerInformationReducer from "../reducers/travellerInformation";
import flightInformationReducer from "../reducers/flightInformation";
export default configureStore({
  reducer: {
    USER: userReducer,
    Toast: toastReducer,
    TravellerInformation: travellerInformationReducer,
    FlightInformation: flightInformationReducer,
  },
});
