import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api/",
  timeout: 35000,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("session_jwt_project_nunes_2023");
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
