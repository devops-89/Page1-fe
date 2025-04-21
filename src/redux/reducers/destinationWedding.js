import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const DestinationWedding = createSlice({
  name: "Destination Wedding ",
  initialState: initialState,
  reducers: {
    setDestinationFormDetails: (state, actions) => {
      return (state = actions.payload);
    },
    resetDestinationDetails: (state) => {
      return (state = initialState);
    },
  },
});

export const { setDestinationFormDetails, resetDestinationDetails } =
  DestinationWedding.actions;
export default DestinationWedding.reducer;
