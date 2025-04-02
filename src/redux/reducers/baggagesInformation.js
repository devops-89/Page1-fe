import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  baggages: {},
};

const baggagesInformation = createSlice({
  name: "baggagesInformation",
  initialState,
  reducers: {
    setBaggageDetails: (state, action) => {
      const { passengerId, baggageId, selected, passengerType } = action.payload;
      const uniquePassengerKey = `${passengerType}-${passengerId}`;

      if (!state.baggages[uniquePassengerKey]) {
        state.baggages[uniquePassengerKey] = { selectedBaggages: [], passengerType };
      }

      const existingBaggageIndex = state.baggages[uniquePassengerKey].selectedBaggages.findIndex(
        (baggage) => baggage.flightId === baggageId && baggage.baggage.Code === selected.Code
      );

      if (existingBaggageIndex === -1) {
        state.baggages[uniquePassengerKey].selectedBaggages.push({ flightId: baggageId, selectedBaggage: selected });
      }
      
    },

    removeBaggageDetails: (state, action) => {
      const { passengerId, flightNumber, baggageCode, passengerType } = action.payload;
      const uniquePassengerKey = `${passengerType}-${passengerId}`;

      if (state.baggages[uniquePassengerKey]) {
        // Remove baggage for the specified flight and baggage code
        state.baggages[uniquePassengerKey].selectedBaggages = state.baggages[uniquePassengerKey].selectedBaggages.filter(
          (baggage) => !(baggage.flightNumber === flightNumber && baggage.selectedBaggage.Code === baggageCode)
        );

        // If no baggage remains for the passenger, remove the passenger entry
        if (state.baggages[uniquePassengerKey].selectedBaggages.length === 0) {
          delete state.baggages[uniquePassengerKey];
        }
      }
    },

    resetBaggageDetails: (state) => {
     
        state.baggages = {};
     
    },
  },
});

export const { setBaggageDetails, removeBaggageDetails, resetBaggageDetails } = baggagesInformation.actions;
export default baggagesInformation.reducer;
