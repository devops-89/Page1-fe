import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedGuests: [],
};

const guestSlice = createSlice({
  name: 'guestSlice',
  initialState,
  reducers: {
    addGuest: (state, action) => {
      state.selectedGuests.push(action.payload);  // Corrected here
    },
    removeGuest: (state, action) => {
      state.selectedGuests = state.selectedGuests.filter((_, idx) => idx !== action.payload);
    },
    setGuests: (state, action) => {
      state.selectedGuests = action.payload;
    },
    clearGuests: (state) => {
      state.selectedGuests = [];
    }
  },
});

export const { addGuest, removeGuest, setGuests, clearGuests } = guestSlice.actions;
export default guestSlice.reducer;
