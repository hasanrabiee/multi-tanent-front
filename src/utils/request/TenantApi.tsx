import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";
import { TOKEN_KEY } from "../constants/constants";
import { removeProtocol } from "../helpers/helpers";

// Function to create an Axios instance dynamically based on tenantId
const TenantApi = (tenantId: string): AxiosInstance => {
  return axios.create({
    baseURL: `${
      "http://" +
      tenantId +
      "." +
      removeProtocol(String(process.env.NEXT_PUBLIC_API_URL))
    }`, // Dynamically add tenantId to base URL
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    timeout: 10000, // Set a timeout for requests
  });
};

// Add request interceptor dynamically
const addRequestInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      // You can modify the config here, like adding authorization tokens
      const token = Cookies.get(TOKEN_KEY); // Assuming the token is stored as 'token'
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      // Handle the request error
      return Promise.reject(error);
    }
  );
};

// Add response interceptor dynamically
const addResponseInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response) => {
      // You can modify the response data here if needed
      return response;
    },
    (error) => {
      // Handle the response error
      return Promise.reject(error);
    }
  );
};

// Function to dynamically generate the Axios instance with interceptors
export const generateTenantApi = (tenantId: string): AxiosInstance => {
  const apiInstance = TenantApi(tenantId);
  addRequestInterceptors(apiInstance);
  addResponseInterceptors(apiInstance);
  return apiInstance;
};

export default generateTenantApi;
