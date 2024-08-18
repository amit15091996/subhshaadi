import axios from "axios";


export const BASE_URL = "http://localhost:7878/api/v1/";

export const AxiosConfig = axios.create({
    baseURL: BASE_URL,
})

export const ProtectedAxiosConfig = axios.create({
    baseURL: BASE_URL,
})




export const publicInterceptor = (contentType) => {
    AxiosConfig.interceptors.request.use(
        (config) => {
            config.headers['Content-Type'] = contentType ? contentType : 'application/json';
            return config
        },
        (error) => {

            return Promise.reject(error)
        }
    )

    AxiosConfig.interceptors.response.use(

        (response) => {
            return response
        },
        (error) => {

            return Promise.reject(error)
        }
    )

    return AxiosConfig;
}