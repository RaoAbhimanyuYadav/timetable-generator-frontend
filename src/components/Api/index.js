import axios from "axios";
const token = localStorage.getItem("authToken");

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (req) => {
    if (token) {
      req.headers.Authorization = `Bearer ${JSON.parse(token).access}`;
    }
    return req;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
