import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://minhnguyen-be.herokuapp.com/",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
  withCredentials: true,
});

export default apiClient;
