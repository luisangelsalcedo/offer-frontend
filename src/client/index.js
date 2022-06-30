import axios from "axios";
import config from "../config";

const httpClient = axios.create({
  baseURL: config.api,
  headers: { "Content-Type": "application/json" },
});

// REQUEST INTERCEPTOR
// httpClient.interceptors.request.use(
//   (config) => config,
//   (error) => Promise.reject(error)
// );

// RESPONSE INTERCEPTOR
// httpClient.interceptors.response.use(
//   (response) => response,
//   (error) => Promise.reject(error)
// );

export default httpClient;
