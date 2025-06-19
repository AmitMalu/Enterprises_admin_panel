import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://192.168.1.219:8081'
})

export default axiosInstance;