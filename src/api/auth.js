import { securedApi, publicApi, userSecuredApi } from "./config";

export const authenticationController = {
  registerUser: async (data) => {
    try {
      let result = await publicApi.post("/register", data);
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
      return result;
    } catch (error) {
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
};
