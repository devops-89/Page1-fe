// redux/reducers/seatsInformation.js
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
        );

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
      }
    },

    // 🔹 NEW: auto-generate seats when seat is mandatory
    generateSeatsForAllPassengers: (state, action) => {
      const { airplaneId, passengerCounts, seatLayout } = action.payload;

      const totalPassengers =
        Number(passengerCounts?.adult || 0) +
        Number(passengerCounts?.child || 0);

      if (!seatLayout?.RowSeats || totalPassengers <= 0) return;

      // flatten all AVAILABLE seats (AvailablityType === 1) in layout order
      const availableSeats = [];
      seatLayout.RowSeats.forEach((row) => {
        row.Seats.forEach((seat) => {
          if (seat.AvailablityType === 1) {
            availableSeats.push(seat);
          }
        });
      });

      if (!availableSeats.length) return;

      const seatsToAssign = availableSeats.slice(0, totalPassengers);

      // get/create airplane entry
      let airplane = state.seats.find((ap) => ap.id === airplaneId);
      if (!airplane) {
        airplane = { id: airplaneId, selectedSeats: [] };
        state.seats.push(airplane);
      }
      if (!airplane.selectedSeats) {
        airplane.selectedSeats = [];
      }

      seatsToAssign.forEach((seat) => {
        const exists = airplane.selectedSeats.some((s) => s.Code === seat.Code);
        if (!exists) {
          airplane.selectedSeats.push({ ...seat });
        }
      });
    },

    resetSeatDetails: (state) => {
      state.seats = [];
    },
  },
});

export const { setSeatDetails, removeSeatDetails,generateSeatsForAllPassengers, resetSeatDetails } =
  seatsInformation.actions;
export default seatsInformation.reducer;
