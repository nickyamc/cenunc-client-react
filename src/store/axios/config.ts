import axios, {AxiosError, AxiosInstance} from "axios";

const {
    VITE_API_URL,
} = import.meta.env;


export const createRelations = (relations: RelationObject[]) => {
    if (relations.length > 0) {
        return `?${relations.map((value): string => `${value.name}=${value.state}`).join('&')}`
    }
    return ''
}

const axiosInstance: AxiosInstance = axios.create({
    baseURL: VITE_API_URL,
})


axiosInstance.interceptors.request.use(
    (config) => {
        const token: string | null = localStorage.getItem('token')
        if (token) config.headers.Authorization = `Bearer ${token}`
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error)
    }
)

export default axiosInstance;