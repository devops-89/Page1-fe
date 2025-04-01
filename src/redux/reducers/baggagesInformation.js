import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  baggages: [],
};

const baggagesInformation = createSlice({
  name: "baggagesInformation",
  initialState,
  reducers: {
    setBaggageDetails: (state, action) => {
      const { flightNumber, selectedBaggage } = action.payload;
      const baggageIndex = state.baggages.findIndex((baggage) => baggage.id === flightNumber);

      if (baggageIndex !== -1) {
        // Replace the selected baggage instead of adding to an array
        state.baggages[baggageIndex].selectedBaggage = { ...selectedBaggage };
      } else {
        state.baggages.push({
          id: flightNumber,
          selectedBaggage: { ...selectedBaggage },
        });
      }
    },
    removeBaggageDetails: (state, action) => {
      const { flightNumber, baggageCode } = action.payload;
      state.baggages = state.baggages.map((baggage) =>
        baggage.id === flightNumber
          ? { ...baggage, selectedBaggage: null }
          : baggage
      );
    },
    resetBaggageDetails: (state) => {
      state.baggages = [];
    },
  },
});

export const { setBaggageDetails, removeBaggageDetails, resetBaggageDetails } = baggagesInformation.actions;
export default baggagesInformation.reducer;
