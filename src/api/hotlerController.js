import { hotlerPublicApi } from "./config";

export const hotlerController = {
  fetchAllHotels: async () => {
    try {
      const result = await hotlerPublicApi.get(`hotelier/fetch-all-hotel`);
      return result;
    } catch (error) {
      throw error;
    }
  },
};
