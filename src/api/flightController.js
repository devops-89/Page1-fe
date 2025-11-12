import { flightPublicApi, securedFlightApi } from "./config";

export const flightController = {
  getAllAirports: async () => {
    try {
      let result = await flightPublicApi.get("flight/all-airport");
      return result;
    } catch (error) {
      throw error;
    }
  },
  searchFlight: async (data) => {
    try {
      let result = await flightPublicApi.post("flight/search-flight", data);
      return result;
    } catch (error) {
      throw error;
    }
  },
  flightDetails: async (data) => {
    try {
      let result = await flightPublicApi.post(
        "flightdetail/flightdetail",
        data
      );

      return result;
    } catch (error) {
      throw error;
    }
  },

  oneWayBookingNonLLC: async (data) => {
    try {
      console.log("nonLCC API called");
      let result = await securedFlightApi.post(
        "flight-booking/non_LCC_booking",
        data
      );
      console.log("result nonLLC", result);
      return result;
    } catch (error) {
      // console.log("error nonLLC", error)
      throw error;
    }
  },

  oneWayBookingLLC: async (data) => {
    try {
      console.log("LCC API called");
      let result = await securedFlightApi.post("flight-booking/booking", data);
      console.log("result LLC", result);
      return result;
    } catch (error) {
      // console.log("error LLC", error)
      throw error;
    }
  },

  roundTrip: async (data) => {
    try {
      let result = await flightPublicApi.post("flight/search-flight", data);
      //  console.log("result",result);
      return result;
    } catch (error) {
      throw error;
    }
  },

  roundflightDetails: async (data) => {
    try {
      let result = await flightPublicApi.post(
        "flightdetail/flightdetail",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  roundTripDomesticBooking: async (data) => {
    try {
      let result = await securedFlightApi.post(
        "flight-booking/round-trip",
        data
      );
      console.log("result", result);
      return result;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  },

  multiflightDetails: async (data) => {
    try {
      let result = await flightPublicApi.post(
        "flightdetail/flightdetail",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getCancellationCharges: async (data) => {
    try {
      let result = await flightPublicApi.post(
        "flightdetail/get-cancellation-charges",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getBookingStatus: async (data) => {
    try {
      let result = await flightPublicApi.post("/flightdetail/getBookingDetails", data);
      return result;
    } catch (error) {
      throw error;
    }
  },
};
