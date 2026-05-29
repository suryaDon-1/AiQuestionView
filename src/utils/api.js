import axios from "axios";
const api = axios.create({
    baseURL: "https://aiquestion-iart.onrender.com/api",
    withCredentials: true
});
export default api;
