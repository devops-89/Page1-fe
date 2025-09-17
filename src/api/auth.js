import {
  publicApi,
  userSecuredApi,
  securedApi,
  basicPublicApi,
} from "./config";


import {jwtDecode} from "jwt-decode"

export const authenticationController = {
  registerUser: async (data) => {
    try {
      let result = await publicApi.post("/register", data);
      console.log("result", result);
      return result;
    } catch (error) {
      throw error;
    }
  },
  verifyOtp: async (data) => {
    try {
      let result = await publicApi.post("/verify", data);
      return result;
    } catch (error) {
      throw error;
    }
  },
  login: async (data) => {
    try {
      let result = await publicApi.post("/login", data);
      console.log("token decrypted:",jwtDecode(result.data.data.access_token));
      return result;
    } catch (error) {
      throw error;
    }
  },
  resetAccessToken: async (data)=>{
    try{
        let result=await publicApi.post("/renewAccessToken",data);
        return result;
    }
    catch(error){
       throw error;
    }

  },
  forgotPassword: async (data) => {
    try {
      let result = await publicApi.post("/forget_password", data);
      return result;
    } catch (error) {
      throw error;
    }
  },
  verifyForgotPasswordOTP: async (data) => {
    try {
      let result = await publicApi.post("/reset_password", data);
      return result;
    } catch (error) {
      throw error;
    }
  },
  getUserDetails: async () => {
    try {
      let result = await userSecuredApi.get("/user_details");
      return result;
    } catch (error) {
      throw error;
    }
  },
  signUpLoginViaEmail: async (data) => {
    try {
      let result = await securedApi.post("/signup_login_via_email", data);
      return result;
    } catch (error) {
      // console.log("error----",error)
      throw error;
    }
  },
  verifyEmailOtp: async (data) => {
    try {
      let result = await securedApi.post("/verify", data);
      return result;
    } catch (error) {
      return error;
    }
  },

  sendEnquiry: async (data) => {
    try {
      let result = await basicPublicApi.post("/page-one-travels", 
        data);
      return result;
    } catch (error) {
      throw error;
    }
  },
};
