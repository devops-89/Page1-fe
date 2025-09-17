import { authenticationController } from "./auth";
export const fetchNewToken = async () => {
  try {
    const accesstoken=localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token"); // use refresh_token if required

    const payload={
        access_token:accesstoken,
        refresh_token:refreshToken
    };
    const response = await authenticationController.resetAccessToken(payload);

    const newAccessToken = response.data.data.access_token;
    const newRefreshToken= response.data.data.refresh_token;
    localStorage.setItem("access_token", newAccessToken);
    localStorage.setItem("refresh_token",newRefreshToken);

    return newAccessToken;
  } catch (err) {
    console.error("Error refreshing token:", err);
    // optional: logout user if refresh fails
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/login";
    throw err;
  }
};