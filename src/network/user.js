import {request} from "./request";

export function getDetail(id) {
    return request({
        // 会自动拼接 baseURL 和 url
        url: '/api/goods/' + id,
        method: 'get',
        params: {}
    })
}