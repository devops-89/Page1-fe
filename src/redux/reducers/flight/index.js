// redux/reducers/flight/index.js
// import { combineReducers } from "@reduxjs/toolkit";
// import travellerInformationReducer from "../travellerInformation";
// import flightInformationReducer from "../flightInformation";
// import formPayloadReducer from "../formPayload";
// import seatsInformationReducer from "../seatsInformation";
// import roundInternationalSeatsInformationReducer from "../roundInternationalSeatsInformation";
// import mealsInformationReducer from "../mealsInformation";
// import baggagesInformationReducer from "../baggagesInformation";

import { combineReducers } from "@reduxjs/toolkit";
import travellerInformationReducer from "../travellerInformation";
import flightInformationReducer from "../flightInformation";
import formPayloadReducer from "../formPayload";
import seatsInformationReducer from "../seatsInformation";
import roundInternationalSeatsInformationReducer from "../roundInternationalSeatsInformation";
import roundDomesticMealsInformationReducer from "../roundDomesticMealsInformation";
import roundDomesticBaggagesInformationReducer from "../RoundDomesticBaggageInformation";
import mealsInformationReducer from "../mealsInformation";
import baggagesInformationReducer from "../baggagesInformation";

const flightReducer = combineReducers({
  TravellerInformation: travellerInformationReducer,
  FlightInformation: flightInformationReducer,
  FormPayload: formPayloadReducer,
  SeatsInformation: seatsInformationReducer,
  RoundInternationalSeatsInformation: roundInternationalSeatsInformationReducer,
  MealsInformation: mealsInformationReducer,
  BaggagesInformation: baggagesInformationReducer,
  RoundDomesticMealsInformation: roundDomesticMealsInformationReducer,
  RoundDomesticBaggagesInformation: roundDomesticBaggagesInformationReducer,
});

export default flightReducer;
