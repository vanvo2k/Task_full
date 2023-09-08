import APIService from "./APIServices"
import {GET, POST} from "../constants/HTTPConstants"
import o from "../helpers/o"
import AuthService from "./AuthServices";

export const _getTotalGgsProducts = (s = '') => {
    return APIService.makeAuthRequest({
        method: POST,
        url: `/ggs-items/total?s=${s}`,
        headers: {
            'x-vctt': s
        }
    })
}

export const _toggleLikeGgsProduct = (productId) => {
    return APIService.makeAuthRequest({
        method: POST,
        url: `/ggs-items/${productId}/like`,
    })
}

export const _searchGgsProducts = (args) => {
    return APIService.makeAuthRequest({
        method: POST,
        url: '/v2/ggs-items/search',
        headers: {
            'X-Refresh-Token': AuthService.getRefreshToken()
        },
        data: {
            q: o(args)
        }
    })
}

export const _getGgsProductDetail = (productId) => {
    return APIService.makeAuthRequest({
        method: GET,
        url: `/ggs-items/${productId}`,
    })
}

export const _getTrendGgsProducts = (args) => {
    return APIService.makeAuthRequest({
        method: POST,
        url: `/ggs-items/trends`,
        data: args
    })
}

export const _getSimilarGgsProducts = (productId, page = 1) => {
    return APIService.makeAuthRequest({
        method: GET,
        url: `/v2/ggs-items/${productId}/similar`,
        params: {
            page
        }
    })
}

export const _checkTrademarkGgsProduct = (productId) => {
    return APIService.makeAuthRequest({
        method: GET,
        url: `/ggs-items/${productId}/trademark`,
    })
}

export const _getASIN = (productId) => {
    return APIService.makeAuthRequest({
        method: GET,
        url: `/ggs-items/${productId}/asin`
    })
}
