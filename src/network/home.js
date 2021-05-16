import {request} from "./request";

export function getHomeAllData() {
    return request({
        // 会自动拼接 baseURL 和 url
        url: '/api/index',
        method: 'get',
        params: {}
    })
}

export function getHomeGoods(type='sales', page=1) {
    return request({
        // 会自动拼接 baseURL 和 url
        url: '/api/index?' + type + '=1&page=' + page,
        method: 'get',
        params: {}
    })
}