import axios from 'axios';

// Create an Axios instance
const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, // Reads the base URL from the environment variable
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    timeout: 10000, // Optional: Set a timeout for requests
});

// You can add interceptors for requests and responses if needed
API.interceptors.request.use(
    (config) => {
        // Do something before sending the request, like adding an auth token
        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);

API.interceptors.response.use(
    (response) => {
        // Handle the response data, modify it if necessary
        return response;
    },
    (error) => {
        // Handle response error
        return Promise.reject(error);
    }
);

export default API;
