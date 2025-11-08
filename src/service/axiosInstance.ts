import axios from "axios";

const BASE_URL ="http://localhost:3000"
// const BASE_URL ="https://shellentertenment-backend.onrender.com"
// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/api/v1`, // Set the base URL once here
  headers: {
    "Content-Type": "application/json", // Set default headers if needed
  },
});

// Attach Authorization header automatically if token exists
axiosInstance.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (_) {}
  return config;
});

export default axiosInstance;