import axios from "axios";

const axiosInstance = axios.create({}) // This is to create an instance of axios

axiosInstance.defaults.baseURL = import.meta.env.VITE_BACKEND_URL; // This is to set the base URL of the backend

axios.defaults.withCredentials = true; // This is to ensure that the cookies are stored in the browser

export default axiosInstance;