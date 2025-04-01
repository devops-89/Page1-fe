import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  baggages: {},
};

const baggagesInformation = createSlice({
  name: "baggagesInformation",
  initialState,
  reducers: {
    setBaggageDetails: (state, action) => {
      const { passengerId, flightNumber, selectedBaggage, passengerType } = action.payload;

      console.log('action.payload---------',action.payload)

      const uniquePassengerKey = `${passengerType}-${passengerId}`; // Unique key

      // Initialize passenger baggage entry if not already present
      if (!state.baggages[uniquePassengerKey]) {
        state.baggages[uniquePassengerKey] = { baggages: [], passengerType };
      }

      // Check if the selected baggage is already added for this flight
      const existingBaggageIndex = state.baggages[uniquePassengerKey].baggages.findIndex(
        (baggage) => baggage.flightNumber === flightNumber && baggage.Code === selectedBaggage?.selected?.Code
      );

      if (existingBaggageIndex === -1) {
        // Add baggage if it's not already selected
        state.baggages[uniquePassengerKey].baggages.push({ flightNumber, baggage: selectedBaggage?.selected });
      } else {
        // Deselect baggage if it's already selected (remove it from the array)
        state.baggages[uniquePassengerKey].baggages.splice(existingBaggageIndex, 1);
      }
    },

    removeBaggageDetails: (state, action) => {
      const { passengerId, flightNumber, baggageCode, passengerType } = action.payload;
      const uniquePassengerKey = `${passengerType}-${passengerId}`;

      if (state.baggages[uniquePassengerKey]) {
        // Remove baggage for the specified flight and baggage code
        state.baggages[uniquePassengerKey].baggages = state.baggages[uniquePassengerKey].baggages.filter(
          (baggage) => !(baggage.flightNumber === flightNumber && baggage.baggage.Code === baggageCode)
        );

        // If no baggage remains for the passenger, remove the passenger entry
        if (state.baggages[uniquePassengerKey].baggages.length === 0) {
          delete state.baggages[uniquePassengerKey];
        }
      }
    },

    resetBaggageDetails: (state, action) => {
      const { passengerId, passengerType } = action.payload;
      const uniquePassengerKey = `${passengerType}-${passengerId}`;

      if (passengerId) {
        // Remove baggage details for a specific passenger
        delete state.baggages[uniquePassengerKey];
      } else {
        // Reset baggage details for all passengers
        state.baggages = {};
      }
    },
  },
});

export const { setBaggageDetails, removeBaggageDetails, resetBaggageDetails } = baggagesInformation.actions;
export default baggagesInformation.reducer;
