import { createSlice,current } from "@reduxjs/toolkit";

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
      Object.assign(state,actions.payload)
      console.log("current user Object:",current(state));
      return state;
    },
    removeUserDetails: (state) => {
      return (state = initialState);
    },
    setAuthenticated : (state, actions)=>{
       state.isAuthenticated = action.payload;
      console.log("current user Object authenticated:",current(state));
      return state;
    },
    setOtpEmailAuthenticated : (state, actions)=>{
      return (state ={...state, email:actions.payload})
    }
  },
});

export const { setUserDetails, removeUserDetails, setAuthenticated, setOtpEmailAuthenticated } = USER.actions;
export default USER.reducer;
