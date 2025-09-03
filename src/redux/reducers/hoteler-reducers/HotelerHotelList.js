// store/hotelSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hotelList: [],
};

export const hotelerHotelSlice = createSlice({
  name: "hotelerHotelList",
  initialState,
  reducers: {
    setHotelerHotelList: (state, action) => {
      state.hotelList = action.payload;
    },
    // clearHotelerHotelList: (state) => {
    //   state.hotelList = [];
    // },
  },
});

export const { setHotelerHotelList } = hotelerHotelSlice.actions;

export default hotelerHotelSlice.reducer;
