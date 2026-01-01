import axios from "axios";

const DB_URL = import.meta.env.VITE_DB_URL || "https://chat-server-seven-blue.vercel.app/api/v1";

export const axiosInstance = axios.create({
  baseURL: DB_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
