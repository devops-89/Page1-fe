import { createSlice } from "@reduxjs/toolkit";

const initialState={
seats:[]
}

const seatsInformation=createSlice({
    name:"Seats Information",
    initialState,
    reducers:{
        setSeatDetails: (state, action) => {
            console.log("Current seats before update:", state.seats); // Debugging

            // Check if the seat already exists
            const isSeatExists = state.seats.some(
                (seat) => seat.Code===action.payload.Code
            );

            console.log("Does seat exist?", isSeatExists);

            // Add the seat only if it doesn't exist
            if (!isSeatExists) {
                state.seats.push(action.payload);
                console.log("Seat added:", action.payload);
            } else {
                console.log("Seat already exists, not adding again.");
            }

            console.log("Updated seats:", state.seats); // Debugging
        },
        removeSeatDetails:(state,action)=>{
            state.seats=state.seats.filter(seat=>!(seat.Code===action.payload.Code) );
        }
    }
})

export const {setSeatDetails,removeSeatDetails}=seatsInformation.actions;
export default seatsInformation.reducer;