import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:7000",
  withCredentials: true,
});

export default axiosInstance;
