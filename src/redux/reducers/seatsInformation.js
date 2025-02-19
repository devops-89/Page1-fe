import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  seats: [],
};

const seatsInformation = createSlice({
  name: "seatsInformation", // Name should not have spaces
  initialState,
  reducers: {
    setSeatDetails: (state, action) => {
      const seatExists = state.seats.some((s) => s.Code === action.payload.Code);

      if (seatExists) {
        state.seats = state.seats.filter((s) => s.Code !== action.payload.Code);
      } else {
        state.seats.push(action.payload); // Immer handles mutation
      }
    },
    removeSeatDetails: (state, action) => {
      state.seats = state.seats.filter((seat) => seat.Code !== action.payload.Code);
    },
  },
});

export const { setSeatDetails, removeSeatDetails } = seatsInformation.actions;
export default seatsInformation.reducer;
