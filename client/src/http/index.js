import axios from 'axios';
const API_NAME = 'api'
const API_PORT = 5000

export const API_URL = `http://localhost:${API_PORT}/${API_NAME}`;

const $api = axios.create({
    withCredentials: true, 
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

$api.interceptors.request.use((config) =>{
    return config;
}, async (error) => {
    const originalRequest = error.config;

    if(error.response.status == 401 && error.config && !error.config._isRetry){
        originalRequest._isRetry = true;

        try{
            console.log("Пробую получить assecc")
            const response = await axios.get(`${API_URL}/user/updateToken`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken);

            return $api.request(originalRequest);
        } catch(e){
            console.log('не авторизован')
        }

    }

    throw error;
})

export default $api;