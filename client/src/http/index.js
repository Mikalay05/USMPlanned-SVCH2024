import axios from 'axios';
const API_NAME = 'api'
const API_PORT = 5000

export const API_URL = `http://localhost:${API_PORT}/${API_NAME}`;

const $api = axios.create({
    withCredentials: true, 
    baseURL: API_URL
})

export default $api;