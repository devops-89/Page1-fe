import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { APIURL } from "./serverConstant";
import { fetchNewToken } from "./getToken";

// ---- Create axios instances ----
export const securedApi = axios.create({
  baseURL: APIURL.authenticationUrl,
});

export const userSecuredApi = axios.create({
  baseURL: APIURL.userUrl,
});

export const securedFlightApi = axios.create({
  baseURL: APIURL.authFlightUrl,
});

export const securedHotelApi = axios.create({
  baseURL: APIURL.hotelUrl,
});

export const securedPaymentUrl = axios.create({
  baseURL: APIURL.authPaymentUrl,
});

export const securedHotelPaymentUrl = axios.create({
  baseURL: APIURL.hotelAuthPaymentUrl,
});

// ---- Attach interceptor for secured requests ----
const securedInstances = [
  securedApi,
  userSecuredApi,
  securedFlightApi,
  securedHotelApi,
  securedPaymentUrl,
  securedHotelPaymentUrl,
];

securedInstances.forEach((instance) => {
  instance.interceptors.request.use(async (config) => {
    let token = localStorage.getItem("access_token");

    if (token) {
      const { exp } = jwtDecode(token);
      const now = Math.floor(Date.now() / 1000);

      if (exp <= now) {
        token = await fetchNewToken(); 
      }
    }

    if (token) {
      config.headers.accesstoken = token;
    }

    return config;
  });
});

// ---- Public APIs (no token needed) ----
export const basicPublicApi = axios.create({
  baseURL: APIURL.basicUrl,
});

export const hotlerPublicApi = axios.create({
  baseURL: APIURL.hotlerUrl,
});

export const flightPublicApi = axios.create({
  baseURL: APIURL.flightUrl,
});

export const dashboardPublicApi = axios.create({
  baseURL: APIURL.dashboardUrl,
});

export const packagePublicApi = axios.create({
  baseURL: APIURL.packageUrl,
});

export const publicApi = axios.create({
  baseURL: APIURL.authenticationUrl,
});

export const hotelPublicApi = axios.create({
  baseURL: APIURL.hotelUrl,
});

