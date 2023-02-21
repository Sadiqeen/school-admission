import axios from 'axios';
import Cookies from 'js-cookie';

// Environment
const API = import.meta.env.VITE_API;
const SANCTUM = import.meta.env.VITE_SANCTUM;

const axiosInstance = axios.create({
    baseURL: API,
    timeout: 1000,
    withCredentials: true,
});

const onRequest = (config: any) => {
    if ((
        config.method == 'post' ||
        config.method == 'put' ||
        config.method == 'delete'
    ) &&
        !Cookies.get('XSRF-TOKEN')) {
        return setCSRFToken()
            .then(response => config);
    }
    return config;
}

const setCSRFToken = () => {
    return axiosInstance.get(SANCTUM + '/sanctum/csrf-cookie');
}

axiosInstance.interceptors.request.use(onRequest, null);

export default axiosInstance;