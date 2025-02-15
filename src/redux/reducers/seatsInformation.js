import { createSlice } from "@reduxjs/toolkit";

const initialState={

}

const seatsInformation=createSlice({
    name:"Seats Information",
    initialState:initialState,
    reducers:{
        setSeatsDetails:(state,action)=>{
            return (state=action.payload);

        },
        removeSeatsDetails:(state,action)=>{
            return (state=initialState);
        }
    }
})

export const {setSeatsDetails,removeSeatsDetails}=seatsInformation.actions;
export default seatsInformation.reducer;