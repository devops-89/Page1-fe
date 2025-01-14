import { flightPublicApi } from "./config";

export const flightController = {
  getAllAirports: async () => {
    try {
      let result = await flightPublicApi.get("/all-airport");
      return result;
    } catch (Error) {
      throw Error;
    }
  },
  searchFlight: async (data) => {
    try {
      let result = await flightPublicApi.post("/search-flight", data);
      return result;
    } catch (error) {
      throw error;
    }
  },
};
