import axios from "axios";

const DB_URL = import.meta.env.VITE_DB_URL || "https://chat-server-seven-blue.vercel.app/";

export const axiosInstance = axios.create({
  baseURL: DB_URL,
  withCredentials: true,
  headers: {
    ContentType: "application/json",
  },
});
