import { dashboardPublicApi } from "./config";

export const dashboardController = {
  getBookingByUserId:async (userId, page, limit, search) => {
    try {
      const queryParams = new URLSearchParams({
        userId:String(userId),
        page: String(page),
        limit: String(limit),
        search: search,
      });

      const result=await dashboardPublicApi.get(`/user-bookings?${queryParams.toString()}`);
      return result;
    } catch (error) {
      console.log("error in fetching the booking details of user: ", error);
      throw error;
    }
  },
};
