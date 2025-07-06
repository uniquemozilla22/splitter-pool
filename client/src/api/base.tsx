import axios from "axios";

const token = JSON.stringify(localStorage.getItem("user") || ""); // Retrieve token from localStorage

const baseURL = import.meta.env.VITE_API_URL; // Adjust this to your backend URL
const axiosBase = axios.create({
  baseURL,
  timeout: 10000, // Set a timeout for requests (optional)
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`, // Uncomment if you need to set an authorization
    // Add any other default headers you need
  },
});

export default axiosBase;
