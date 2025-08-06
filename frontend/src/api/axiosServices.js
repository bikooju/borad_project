import axios from "axios";

const axiosServices = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL || '/',
    headers: {
        'content-Type' : 'application/json',
    }
})

export default axiosServices;