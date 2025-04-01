import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/user";
import toastReducer from "../reducers/toast";
import travellerInformationReducer from "../reducers/travellerInformation";
import flightInformationReducer from "../reducers/flightInformation";
import formPayloadReducer from "../reducers/formPayload";
import seatsInformationReducer from "../reducers/seatsInformation";
import roundInternationalSeatsInformationReducer from "../reducers/roundInternationalSeatsInformation";
export default configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    USER: userReducer,
    Toast: toastReducer,
    TravellerInformation: travellerInformationReducer,
    FormPayload:formPayloadReducer,
    FlightInformation: flightInformationReducer,
    SeatsInformation: seatsInformationReducer,
    RoundInternationalSeatsInformation: roundInternationalSeatsInformationReducer
  },
 
});
