import axios from "axios";

export function request(config) {
    const instance = axios.create({
        baseURL: 'https://api.shop.eduwork.cn',
        timeout: 5000,
    })

    // 请求拦截
    instance.interceptors.request.use(config => {
        // 如果有一个接口需要认证才可以访问，就在这统一设置

        // 直接放行
        return config;
    }, error => {

    })

    // 响应拦截
    instance.interceptors.response.use(res => {
        // 直接放行
        return res.data ? res.data : res;
    }, error => {
        // 如果有错误状态码，在这里进行处理
    })

    return instance(config);
}