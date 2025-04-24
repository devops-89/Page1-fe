import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedGuests: [],
  commonFields:{
    email: "",
    mobile: "",
  }
};

const guestSlice = createSlice({
  name: 'guestSlice',
  initialState,
  reducers: {
    addPersistGuest: (state, action) => {
      state.selectedGuests.push(action.payload);  
    },
    updatePersistGuest: (state, action)=>{
        const firstGuest=state.selectedGuests.length>0?state.selectedGuests[0]:null;
         state.selectedGuests=[firstGuest,...action.payload];
    },
    removePersistGuest: (state, action) => {
      state.selectedGuests = state.selectedGuests.filter((_, idx) => idx !== action.payload);
    },
    setPersistGuests: (state, action) => {
      state.selectedGuests = action.payload;
    },
    clearPersistGuests: (state) => {
      state.selectedGuests = [];
    },
    addCommonFields:(state,action)=>{
      let {email,mobile}=action.payload;
      if(email!=="" && mobile!=="")
      {
        state.commonFields.email=email;
        state.commonFields.mobile=mobile;
      }
    },
    clearCommonFields:(state)=>{
      state.commonFields={
        email: "",
        mobile: "",
      }
    }
  },
});

export const { addPersistGuest, removePersistGuest,updatePersistGuest, setPersistGuests, clearPersistGuests,addCommonFields,clearCommonFields } = guestSlice.actions;
export default guestSlice.reducer;
