import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  outgoingSeats: [], 
  incomingSeats: [], 
};

const roundInternationalSeatsInformation = createSlice({
  name: "roundInternationalSeatsInformation",
  initialState,
  reducers: {
    setSeatDetails: (state, action) => {
      const { airplaneId, selected, journeyType } = action.payload;
    //  console.log("-----------",journeyType)
     if(journeyType==="outgoing"){
 // Find the airplane in the selected journey type
 const airplane = state.outgoingSeats.find((ap) => ap.id === airplaneId);
  // console.log("outgoing airplane:",airplane);
 if (airplane) {
 
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
  console.log("airplasne",airplaneId,selected)
   
   state.outgoingSeats.push({
     id: airplaneId,
     selectedSeats: [{ ...selected }],
   });
 }
     }
     else{
       // Find the airplane in the selected journey type
 const airplane = state.incomingSeats.find((ap) => ap.id === airplaneId);

 if (airplane) {
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
   state.incomingSeats.push({
     id: airplaneId,
     selectedSeats: [{ ...selected }],
   });
 }

     }

     
     
      
    },

    removeSeatDetails: (state, action) => {
      const { airplaneId, seatCode, journeyType } = action.payload;
      const targetSeats =
        journeyType === "outgoing" ? state.outgoingSeats : state.incomingSeats;

      const airplaneIndex = targetSeats.findIndex((ap) => ap.id === airplaneId);

      if (airplaneIndex !== -1) {
        targetSeats[airplaneIndex].selectedSeats = targetSeats[
          airplaneIndex
        ].selectedSeats.filter((seat) => seat.Code !== seatCode);
      }
    },

    // auto-generate seats (outgoing / incoming)
    generateSeatsForAllPassengers: (state, action) => {
      const { airplaneId, passengerCounts, seatLayout, journeyType } =
        action.payload;

      const totalPassengers =
        Number(passengerCounts?.adult || 0) +
        Number(passengerCounts?.child || 0);

      if (!seatLayout?.RowSeats || totalPassengers <= 0) return;

      // collect all AVAILABLE seats in layout order
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

      const targetSeats =
        journeyType === "outgoing" ? state.outgoingSeats : state.incomingSeats;

      let airplane = targetSeats.find((ap) => ap.id === airplaneId);
      if (!airplane) {
        airplane = { id: airplaneId, selectedSeats: [] };
        targetSeats.push(airplane);
      }
      if (!airplane.selectedSeats) airplane.selectedSeats = [];

      seatsToAssign.forEach((seat) => {
        const exists = airplane.selectedSeats.some((s) => s.Code === seat.Code);
        if (!exists) {
          airplane.selectedSeats.push({ ...seat });
        }
      });
    },

    resetSeatDetails: (state) => {
      state.outgoingSeats = [];
      state.incomingSeats = [];
    },
  },
});

export const { setSeatDetails, removeSeatDetails,generateSeatsForAllPassengers, resetSeatDetails } = roundInternationalSeatsInformation.actions
export default roundInternationalSeatsInformation.reducer
