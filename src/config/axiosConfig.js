import axios from "axios";

const axiosConfig = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const setAuthorizationToken = (token) => {
  if (token) {
    axiosConfig.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("ecommerce_training_token", token);
  } else {
    delete axiosConfig.defaults.headers.common["Authorization"];
    localStorage.removeItem("ecommerce_training_token");
  }
};

axiosConfig.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("ecommerce_training_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { setAuthorizationToken };
export default axiosConfig;
