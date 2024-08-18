import axios from "axios";

export const axiosApi = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL || "http://localhost:5084",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
    },
})

export default axiosApi;