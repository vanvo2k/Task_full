import APIService from "./APIServices"

export const _getListEvents = (args) => {
    return APIService.makeAuthRequest({
        url: '/events/list',
        method: 'GET',
        params: args
    })
}

export const _getProducts = (args) => {
    return APIService.makeAuthRequest({
        url: '/events/products',
        method: 'POST',
        data: args
    })
}

export const _getAllEvents = () => {
    return APIService.makeAuthRequest({
        url: '/events/all',
        method: 'GET'
    })
}
