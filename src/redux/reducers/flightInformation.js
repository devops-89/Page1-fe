const { createSlice } = require("@reduxjs/toolkit");

let initialState = {
  destination: "",
  origin: "",
  trace_id: "",
  flight_list: null,
};

const flightInformation = createSlice({
  name: "Flight Information",
  initialState: initialState,
  reducers: {
    setFlightDetails: (state, actions) => {
      return (state = actions.payload);
    },
    removeFlightDetails: (state) => {
      return (state = initialState);
    },
  },
});

export const { setFlightDetails, removeFlightDetails } =
  flightInformation.actions;
export default flightInformation.reducer;
