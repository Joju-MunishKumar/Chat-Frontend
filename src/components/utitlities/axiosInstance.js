import axios from "axios";

const DB_URL ="https://chatbackend-kjcd.onrender.com/api/v1" || import.meta.env.VITE_DB_URL ;

export const axiosInstance = axios.create({
  baseURL: DB_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
