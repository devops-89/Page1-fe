import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ip_address: "",
  journey_type: "ONEWAY", // ONEWAY | ROUNDTRIP | MULTICITY
  preferred_time: "AnyTime",
  adult: 1,
  child: 0,
  infant: 0,
  cabin_class: "1",
  direct_flight: false,
  one_stop_flight: false,

  // Conditional fields depending on journey_type
  origin: "",
  destination: "",
  departure_date: "",
  return_date: "",

  // For MULTICITY journeys
  multicity: []
};

const flightStateSlice = createSlice({
  name: "flightState",
  initialState,
  reducers: {
    setFlightState: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetFlightState: () => {
      return initialState;
    }
  }
});

export const { setFlightState, resetFlightState } = flightStateSlice.actions;
export default flightStateSlice.reducer;