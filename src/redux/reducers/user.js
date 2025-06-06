import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  email: "",
  full_name: "",
  reference_id: "",
  access_token: "",
  user_type: "",
  refresh_token: "",
  isAuthenticated: false,
  id: "",
};

export const USER = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUserDetails: (state, actions) => {
      return (state = actions.payload);
    },
    removeUserDetails: (state) => {
      return (state = initialState);
    },
    setAuthenticated : (state, actions)=>{
      return (state ={...state, isAuthenticated:actions.payload})
    },
    setOtpEmailAuthenticated : (state, actions)=>{
      return (state ={...state, email:actions.payload})
    }
  },
});

export const { setUserDetails, removeUserDetails, setAuthenticated, setOtpEmailAuthenticated } = USER.actions;
export default USER.reducer;
