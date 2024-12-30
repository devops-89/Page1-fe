import  securedApi  from "./config";




export const authenticationController = {
  registerUser: async (data) => {
    try {
      let result = await securedApi.publicApi.post("/register", data);
      return result;
    } catch (error) {
      throw error;
    }
  },
};
