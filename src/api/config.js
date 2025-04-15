const { default: axios } = require("axios");
const { APIURL } = require("./serverConstant");

const securedApi = axios.create({
  baseURL: APIURL.authenticationUrl,
});

const userSecuredApi = axios.create({
  baseURL: APIURL.userUrl,
});

const securedFlightApi=axios.create({
  baseURL: APIURL.authFlightUrl
})

const securedPaymentUrl=axios.create({
  baseURL: APIURL.authPaymentUrl
})

const flightPublicApi = axios.create({
  baseURL: APIURL.flightUrl,
});

const publicApi = axios.create({
  baseURL: APIURL.authenticationUrl,
});

const hotelPublicApi=axios.create({
  baseURL:APIURL.hotelUrl
})



userSecuredApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("accesstoken");
  config.headers.accesstoken = token;
  return config;
});

securedApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("accesstoken");
  config.headers.accesstoken = token;
  return config;
});

securedFlightApi.interceptors.request.use((config)=>{
  const token = localStorage.getItem("accesstoken");
  config.headers.accesstoken = token;
  return config;
})

securedPaymentUrl.interceptors.request.use((config)=>{
  const token = localStorage.getItem("accesstoken");
  config.headers.accesstoken = token;
  return config;
})




securedFlightApi.interceptors.response.use(
  (response)=>  response,
   (error)=> Promise.reject(error.response?.data || error.message)
)

// error handling for fligh instance
flightPublicApi.interceptors.response.use(
  (response)=>  response,
   (error)=> Promise.reject(error.response?.data || error.message)
)

module.exports = {
  securedApi,
  publicApi,
  securedFlightApi,
  userSecuredApi,
  flightPublicApi,
  securedPaymentUrl,
  hotelPublicApi
};
