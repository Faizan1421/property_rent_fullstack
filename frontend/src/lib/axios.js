import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `https://property-rent-fullstack.onrender.com/api/v1`,
  withCredentials: true,
});
