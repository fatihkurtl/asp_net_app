import axios from "axios";

export const axiosApi = axios.create({
    baseURL: "http://localhost:5084",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InVzZXJuYW1lIiwibmJmIjoxNzIzOTA2OTc5LCJleHAiOjE3MjM5MTA1NzksImlhdCI6MTcyMzkwNjk3OSwiaXNzIjoiaHR0cHM6Ly9mYXRpaGt1cnQuY29tIiwiYXVkIjoiaHR0cHM6Ly9mYXRpaGt1cnQuY29tIn0.kxLBnoAZS_kqv0iIs2H_HtTIl507GCxOepvp-gA_s0Y"
    },
})

export default axiosApi;