import { configureStore,combineReducers } from "@reduxjs/toolkit";

// import userReducer from "../reducers/user";
// import toastReducer from "../reducers/toast";
// import travellerInformationReducer from "../reducers/travellerInformation";
// import flightInformationReducer from "../reducers/flightInformation";
// import formPayloadReducer from "../reducers/formPayload";
// import seatsInformationReducer from "../reducers/seatsInformation";
// import roundInternationalSeatsInformationReducer from "../reducers/roundInternationalSeatsInformation";
// import mealsInformationReducer from "../reducers/mealsInformation";
// import baggagesInformationReducer from '../reducers/baggagesInformation'
import flightReducer from "../reducers/flight";
import userReducer from "../reducers/userReducer";
import toastReducer from "../reducers/toastReducer";

const rootReducer=combineReducers({
  USER:userReducer,
  Toast:toastReducer,
  Flight:flightReducer
})

export default configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: rootReducer
 
});
