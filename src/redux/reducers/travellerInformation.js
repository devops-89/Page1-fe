const { createSlice } = require("@reduxjs/toolkit");

let initialState = {
  ip_address: "",
  journey_type: "",
  preferred_time: "",
  origin: "",
  destination: "",
  departure_date: "",
  return_date: "",
  cabin_class: "",
  adult: "",
  infant: "",
  child: "",
  direct_flight: false,
  one_stop_flight: false,
};

const travellerInformation = createSlice({
  name: "TravellerInformation",
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
  travellerInformation.actions;
export default travellerInformation.reducer;
