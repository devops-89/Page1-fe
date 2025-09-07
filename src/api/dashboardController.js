import { dashboardPublicApi } from "./config";

export const dashboardController = {
  getFlightBookingByUserId:async (userId, page, limit, search) => {
    try {
      const queryParams = new URLSearchParams({
        userId:String(userId),
        page: String(page),
        limit: String(limit),
        search: search,
        orderType:"FLIGHT"
      });

      const result=await dashboardPublicApi.get(`/user-bookings?${queryParams.toString()}`);
      return result;
    } catch (error) {
      console.log("error in fetching the booking details of user: ", error);
      throw error;
    }
  },
  getHotelBookingByUserId:async (userId, page, limit, search)=>{
    try {
      const queryParams = new URLSearchParams({
        userId:String(userId),
        page: String(page),
        limit: String(limit),
        search: search,
        orderType:"HOTEL"
      });

      const result=await dashboardPublicApi.get(`/user-bookings?${queryParams.toString()}`);
      return result;
    } catch (error) {
      console.log("error in fetching the booking details of user: ", error);
      throw error;
    }
  }
};
