// store/hotelSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hotelList: [],
};

export const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    setHotelList: (state, action) => {
      state.hotelList = action.payload;
    },
    clearHotelList: (state) => {
      state.hotelList = [];
    },
  },
});

export const { setHotelList, clearHotelList } = hotelSlice.actions;

export default hotelSlice.reducer;
