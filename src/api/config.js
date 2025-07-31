const { default: axios } = require("axios");
const { APIURL } = require("./serverConstant");
// const { config } = require("next/dist/build/templates/pages");

const securedApi = axios.create({
  baseURL: APIURL.authenticationUrl,
});

const userSecuredApi = axios.create({
  baseURL: APIURL.userUrl,
});

const basicPublicApi = axios.create({
  baseURL: APIURL.basicUrl,
});

const securedFlightApi = axios.create({
  baseURL: APIURL.authFlightUrl,
});

const securedPaymentUrl = axios.create({
  baseURL: APIURL.authPaymentUrl,
});

const securedHotelPaymentUrl=axios.create({
  baseURL:APIURL.hotelAuthPaymentUrl,
})

const flightPublicApi = axios.create({
  baseURL: APIURL.flightUrl,
});

const dashboardPublicApi=axios.create({
  baseURL: APIURL.dashboardUrl,
})

const packagePublicApi=axios.create({
  baseURL:APIURL.packageUrl
})

const publicApi = axios.create({
  baseURL: APIURL.authenticationUrl,
});

const hotelPublicApi = axios.create({
  baseURL: APIURL.hotelUrl,
});

const securedHotelApi=axios.create({
  baseURL:APIURL.hotelUrl,
})

userSecuredApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  config.headers.accesstoken = token;
  return config;
});

securedApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  config.headers.accesstoken = token;
  return config;
});

securedFlightApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  config.headers.accesstoken = token;
  return config;
});

securedHotelApi.interceptors.request.use((config)=>{
    const token=localStorage.getItem("access_token");
    config.headers.accesstoken=token;
    return config;
})

securedPaymentUrl.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  config.headers.accesstoken = token;
  return config;
});

securedHotelPaymentUrl.interceptors.request.use((config)=>{
  const token=localStorage.getItem("access_token");
  config.headers.accesstoken=token;
  return config;
})

securedFlightApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response?.data || error.message)
);

// error handling for fligh instance
flightPublicApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response?.data || error.message)
);

module.exports = {
  securedApi,
  publicApi,
  securedFlightApi,
  securedHotelApi,
  userSecuredApi,
  flightPublicApi,
  securedPaymentUrl,
  hotelPublicApi,
  basicPublicApi,
  dashboardPublicApi,
  packagePublicApi,
  securedHotelPaymentUrl
};
