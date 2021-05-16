import {request} from "./request";

export function getGoods() {
    return request({
        // 会自动拼接 baseURL 和 url
        url: '/api/goods',
        method: 'get',
        params: {}
    })
}

export function getCategoryGoods(order="sales", cid=0, page=1) {
    return request({
        // 会自动拼接 baseURL 和 url
        url: '/api/goods?category_id=' + cid + '&page=' + page + '&' + order + '=1',
        method: 'get',
        params: {}
    })
}