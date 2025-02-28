const { createSlice } = require("@reduxjs/toolkit");

let initialState = {
    adult: "",
    cabin_class: "",
    child:"",
    departure_date: "",
    destination: "",
    destinationAirport: "",
    destinationCity: "",
    direct_flight: false,
    infant:"",
    ip_address: "",
    journey_type: "",
    one_stop_flight: false,
    origin: "",
    originAirport: "",
    originCity: "",
    preferred_time: "",
    return_date: "",
};

const roundtriptravellerInformation = createSlice({
  name: "RoundTripTravellerInformation",
  initialState: initialState,
  reducers: {
    setTravellerInformation: (state, actions) => {
      return { ...state, ...actions.payload };
    },
    removeTravellerInformation: (state) => {
      return (state = initialState);
    },
  },
});

export const { setTravellerInformation, removeTravellerInformation } =
  roundtriptravellerInformation.actions;
export default roundtriptravellerInformation.reducer;
