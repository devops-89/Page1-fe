const { default: axios } = require("axios");
const { APIURL } = require("./serverConstant");

const securedApi = axios.create({
  baseURL: APIURL.authenticationUrl,
});

securedApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("login_token");
  config.headers.accessToken = token;
});

const publicApi = axios.create({
  baseURL: APIURL.authenticationUrl,
});

module.exports = {
  securedApi,
  publicApi,
};
