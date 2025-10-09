import { hotelPublicApi, securedHotelApi } from "./config";

export const hotelController = {
  searchHotel: async (data) => {
    try {
      let result = await hotelPublicApi.post("/hotel/search", data);
      return result;
    } catch (error) {
      throw error;
    }
  },
  hotelDetail: async (data) => {
    try {
      let result = await hotelPublicApi.post("/hotel/clientHotelDetails",data);
      return result;
    } catch (error) {
      throw error;
    }
  },
  preBook: async (data) => {
    try {
      let result = await hotelPublicApi.post("/hotel/prebook", data);
      return result;
    } catch (error) {
      throw error;
    }
  },
  hotelBook: async (data) => {
    try {
      let result = await securedHotelApi.post("hotel/hotelBooking", data);
      return result;
    } catch (error) {
      throw error;
    }
  },
  cancelHotel: async (data) => {
    try {
      let result = await hotelPublicApi.post("/hotel/cancelBooking", data);
      return result;
    } catch (error) {
      throw error;
    }
  },
  searchCountry: async (data) => {
    try {
      let result = await hotelPublicApi.get("/hotel/country-list", data);
      return result;
    } catch (error) {
      throw error;
    }
  },
   getBookingStatus: async (data) => {
    try {
      let result = await hotelPublicApi.post("/hotel/getBookingDetails", data);
      return result;
    } catch (error) {
      throw error;
    }
  },
  checkCancellationStatus : async (data) =>{
     try {
      let result = await hotelPublicApi.post("/hotel/cancelStatus", data);
      return result;
    } catch (error) {
      throw error;
    }
  }
};
