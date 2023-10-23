import axios from "axios";

export const $host = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL
}) 

// const authInterceptor = config => {
//     config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
//     return config
// }