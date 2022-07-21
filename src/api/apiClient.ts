import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://0.0.0.0:5000",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
  withCredentials: true,
});

export default apiClient;
