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

      // Find the airplane by ID
      const airplane = state.seats.find((ap) => ap.id === airplaneId);

      if (airplane) {
        // Ensure selectedSeats exists
        if (!airplane.selectedSeats) {
          airplane.selectedSeats = [];
        }

        const seatExists = airplane.selectedSeats.some(
          (s) => s.Code === selected.Code
        );0

        if (seatExists) {
          // Remove the seat if it exists
          airplane.selectedSeats = airplane.selectedSeats.filter(
            (s) => s.Code !== selected.Code
          );
        } else {
          // Add the seat if it does not exist
          airplane.selectedSeats.push({ ...selected });
        }
      } else {
        // If airplane does not exist, create a new entry
        state.seats.push({
          id: airplaneId,
          selectedSeats: [{ ...selected }],
        });
      }
    },

    removeSeatDetails: (state, action) => {
      const { airplaneId, seatCode } = action.payload;

      const airplaneIndex = state.seats.findIndex((ap) => ap.id === airplaneId);

      if (airplaneIndex !== -1) {
        // Ensure selectedSeats exists
        if (!state.seats[airplaneIndex].selectedSeats) {
          state.seats[airplaneIndex].selectedSeats = [];
        }

        // Filter out the seat with the given seatCode
        state.seats[airplaneIndex].selectedSeats = state.seats[
          airplaneIndex
        ].selectedSeats.filter((seat) => seat.Code !== seatCode);

        // If no seats remain, remove the airplane entry
        // if (state.seats[airplaneIndex].selectedSeats.length === 0) {
        //   state.seats.splice(airplaneIndex, 1);
        // }
      }
    },

    resetSeatDetails: (state) => {
      state.seats = [];
    },       
  },
});

export const { setSeatDetails, removeSeatDetails, resetSeatDetails } =
  seatsInformation.actions;
export default seatsInformation.reducer;
