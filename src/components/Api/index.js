import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${JSON.parse(token)}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error?.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      localStorage.removeItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        window.location = "/login";
      }
      return axios
        .post("http://127.0.0.1:8000/api/v1/login/token/refresh/", {
          refresh: JSON.parse(refreshToken),
        })
        .then(async (res) => {
          if (res.status === 200) {
            localStorage.setItem(
              "accessToken",
              JSON.stringify(res.data.access)
            );
            const clone = {
              ...originalRequest,
              headers: {
                Authorization: `Bearer ${res.data.access}`,
                "Content-Type": "application/json",
              },
            };
            const originalResponse = await axiosInstance(clone);
            return originalResponse;
          }
        })
        .catch((err) => {
          window.location = "/login";
          console.log(err);
          return Promise.reject(err);
        });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
