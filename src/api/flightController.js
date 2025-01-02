import { flightPublicApi } from "./config";

export const flightController = {
  getAllAirports: async () => {
    try {
      let result = await flightPublicApi.get("/all-airport");
      return result;
    } catch (Error) {
      throw error;
    }
  },
};
