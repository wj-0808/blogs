import axios from 'axios';

const http = axios.create({
    baseURL: import.meta.env.VITE_BASE_API,
    timeout: 10000,
})

// // 添加请求拦截器
http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 发送token
    const token = sessionStorage.getItem('token');
    if (token) config.headers['authorization'] = 'Bearer ' + token;
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

export default http