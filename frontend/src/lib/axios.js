import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:import.meta.env.VITE_SOCKET_SERVER_URL,
    withCredentials:true,
});