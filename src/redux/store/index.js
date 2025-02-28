import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/user";
import toastReducer from "../reducers/toast";
import travellerInformationReducer from "../reducers/travellerInformation";
import flightInformationReducer from "../reducers/flightInformation";
import roundTripTravellerInformationReducer from "../reducers/roundtriptravellerInformation"
import seatsInformationReducer from "../reducers/seatsInformation";
export default configureStore({
  reducer: {
    USER: userReducer,
    Toast: toastReducer,
    TravellerInformation: travellerInformationReducer,
    RoundTripTravellerInformation: roundTripTravellerInformationReducer,
    FlightInformation: flightInformationReducer,
    SeatsInformation: seatsInformationReducer
  },
});
