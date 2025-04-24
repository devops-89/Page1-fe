import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  guestSelected: [],
};

const guestAdditionSlice = createSlice({
  name: "guestAdditionSlice",
  initialState: initialState,
  reducers: {
    addGuest: (state, action) => {

      state.guestSelected.push(action.payload);
    },
    removeGuest: (state, action) => {
      state.guestSelected = state.guestSelected.filter(
        (_, id) => id !== action.payload
      );
    },
    setGuests: (state, action) => {
      state.guestSelected = action.payload;
    },
    clearGuests: (state) => {
      state.guestSelected = [];
    },
  },
});

export const { addGuest, removeGuest, setGuests, clearGuests } =
  guestAdditionSlice.actions;
export default guestAdditionSlice.reducer;
