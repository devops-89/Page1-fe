import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCity: null,
  paxRoom: [{ Adults: 1, children: 0, ChildrenAges: [] }],
  checkIn: null,
  checkOut: null,
  userIp: "",
};
export const hotelSearchDataSlice = createSlice({
  name: "hotelSearchData",
  initialState,
  reducers: {
    setHotelFormData: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetHotelForm: () => initialState,
  },
});

export const { setHotelFormData, resetHotelForm } =
  hotelSearchDataSlice.actions;
export default hotelSearchDataSlice.reducer;
