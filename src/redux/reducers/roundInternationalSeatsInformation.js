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
     console.log("-----------",journeyType)
     if(journeyType==="outgoing"){
 // Find the airplane in the selected journey type
 const airplane = state.outgoingSeats.find((ap) => ap.id === airplaneId);
  console.log("outgoing airplane:",airplane);
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

    resetSeatDetails: (state) => {
      state.outgoingSeats = [];
      state.incomingSeats = [];
    },
  },
});

export const { setSeatDetails, removeSeatDetails, resetSeatDetails } = roundInternationalSeatsInformation.actions
export default roundInternationalSeatsInformation.reducer
