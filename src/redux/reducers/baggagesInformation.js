import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  baggages: {},
};

const baggagesInformation = createSlice({
  name: "baggagesInformation",
  initialState,
  reducers: {
    setBaggageDetails: (state, action) => {
      // keep the SAME payload names:
      // { passengerId, baggageId, selected, passengerType }
      const { passengerId, baggageId, selected, passengerType } = action.payload;
      const uniquePassengerKey = `${passengerType}-${passengerId}`;

      if (!state.baggages[uniquePassengerKey]) {
        state.baggages[uniquePassengerKey] = {
          selectedBaggages: [],
          passengerType,
        };
      }

      const list = state.baggages[uniquePassengerKey].selectedBaggages;
      const fid = String(baggageId); // normalize to string

      // find existing by flight id (support any previous shapes)
      const idx = list.findIndex((b) => {
        const existingFid = String(b.flightId ?? b.baggageId ?? b.flightNumber);
        const existingCode = b.selectedBaggage?.Code ?? b.selected?.Code;
        return existingFid === fid && existingCode === (selected?.Code);
      });

      // Replace (by flight) OR insert if not found
      const record = { flightId: fid, selectedBaggage: selected };

      if (idx === -1) {
        // also check if there is ANY selection for this flight and replace it
        const flightIdx = list.findIndex(
          (b) => String(b.flightId ?? b.baggageId ?? b.flightNumber) === fid
        );
        if (flightIdx === -1) {
          list.push(record);
        } else {
          list[flightIdx] = record;
        }
      } else {
        list[idx] = record;
      }
    },

    removeBaggageDetails: (state, action) => {
      // keep the SAME payload names:
      // { passengerId, flightNumber, baggageCode, passengerType }
      const { passengerId, flightNumber, baggageCode, passengerType } = action.payload;
      const uniquePassengerKey = `${passengerType}-${passengerId}`;

      const entry = state.baggages[uniquePassengerKey];
      if (!entry) return;

      const fid = String(flightNumber ?? action.payload.baggageId); // accept either

      entry.selectedBaggages = entry.selectedBaggages.filter((b) => {
        const existingFid = String(b.flightId ?? b.baggageId ?? b.flightNumber);
        const existingCode = b.selectedBaggage?.Code ?? b.selected?.Code;

        // keep if different flight
        if (existingFid !== fid) return true;

        // if no code provided, remove any selection for this flight
        if (!baggageCode) return false;

        // otherwise remove only matching code
        return existingCode !== baggageCode;
      });

      if (entry.selectedBaggages.length === 0) {
        delete state.baggages[uniquePassengerKey];
      }
    },

    resetBaggageDetails: (state) => {
      state.baggages = {};
    },
  },
});

export const {
  setBaggageDetails,
  removeBaggageDetails,
  resetBaggageDetails,
} = baggagesInformation.actions;

export default baggagesInformation.reducer;
