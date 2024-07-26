import axios from "axios";

const axiosConfig = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("ecommerce_training_token")
      ? `Bearer ${localStorage.getItem("ecommerce_training_token")}`
      : "",
  },
});

const setAuthorizationToken = (token) => {
  axiosConfig.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

axiosConfig.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { setAuthorizationToken };
export default axiosConfig;
