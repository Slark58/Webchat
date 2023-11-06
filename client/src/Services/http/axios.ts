import axios, { InternalAxiosRequestConfig } from "axios";

const $host = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL
}) 

const $authHost = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
})

const authInterceptor = (config: InternalAxiosRequestConfig) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config   
}

$authHost.interceptors.request.use(authInterceptor)


export {
    $host,
    $authHost
}