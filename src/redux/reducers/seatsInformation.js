import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  seats: [], 
};

const seatsInformation = createSlice({
  name: "seatsInformation",
  initialState,
  reducers: {
    setSeatDetails: (state, action) => {
      const { airplaneId, selected } = action.payload;

      const airplaneIndex = state.seats.findIndex((ap) => ap.id === airplaneId);

      if (airplaneIndex !== -1) {
        // Ensure seats array exists
        if (!state.seats[airplaneIndex].selectedSeats) {
          state.seats[airplaneIndex].selectedSeats = [];
        }

        const seatExists = state.seats[airplaneIndex].selectedSeats.some(
          (s) => s.Code === selected.Code
        );

        if (seatExists) {
          // Remove the seat if it exists
          state.seats[airplaneIndex].selectedSeats = state.seats[
            airplaneIndex
          ].selectedSeats.filter((s) => s.Code !== selected.Code);
        } else {
          // Add the seat if it not exist
          state.seats[airplaneIndex].selectedSeats = [
            ...state.seats[airplaneIndex].selectedSeats,
            { ...selected },
          ];
        }
      } else {
        // Add new airplane with seat details
        state.seats.push({
          id: airplaneId,
          selectedSeats: [{ ...selected }],
        });
      }
    },

    removeSeatDetails: (state, action) => {
      const { airplaneId, seatCode } = action.payload;
      console.log(airplaneId, seatCode);

      const airplaneIndex = state.seats.findIndex((ap) => ap.id === airplaneId);

      if (airplaneIndex !== -1) {
        state.seats[airplaneIndex].selectedSeats = state.seats[airplaneIndex].selectedSeats.filter(
          (seat) => seat.Code !== seatCode
        );

        // If no seats remain, remove the airplane entry
        if (state.seats[airplaneIndex].selectedSeats.length === 0) {
          state.seats.splice(airplaneIndex, 1);
        }
      }
    },

    resetSeatDetails: (state, action) => {
      const { airplaneId } = action.payload;

      if (airplaneId) {
        const airplaneIndex = state.seats.findIndex((ap) => ap.id === airplaneId);
        if (airplaneIndex !== -1) {
          state.seats[airplaneIndex].selectedSeats = [];
        }
      } else {
        state.seats = [];
      }
    },
  },
});

export const { setSeatDetails, removeSeatDetails, resetSeatDetails } = seatsInformation.actions;
export default seatsInformation.reducer;
