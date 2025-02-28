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

userSecuredApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  config.headers.accessToken = token;
  return config;
});

securedApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  config.headers.accessToken = token;
  return config;
});

securedFlightApi.interceptors.request.use((config)=>{
  const token = localStorage.getItem("access_token");
  config.headers.accesstoken = token;
  return config;
})

const flightPublicApi = axios.create({
  baseURL: APIURL.flightUrl,
});

const publicApi = axios.create({
  baseURL: APIURL.authenticationUrl,
});




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
};
