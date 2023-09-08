import APIService from "./APIServices"
import {GET, POST} from "../constants/HTTPConstants"
import o from "../helpers/o"
import AuthService from "./AuthServices";

export const _getTotalProducts = (s = '') => {
    return APIService.makeAuthRequest({
        method: POST,
        url: `/products/total?s=${s}`,
        headers: {
            'x-vctt': s
        }
    })
}

export const _toggleLikeProduct = (productId) => {
    return APIService.makeAuthRequest({
        method: POST,
        url: `/products/${productId}/like`,
    })
}

export const _searchProducts = (args) => {
    return APIService.makeAuthRequest({
        method: POST,
        url: '/v2/products/search',
        headers: {
            'X-Refresh-Token': AuthService.getRefreshToken()
        },
        data: {
            q: o(args)
        }
    })
}

export const _getProductDetail = (productId) => {
    return APIService.makeAuthRequest({
        method: GET,
        url: `/products/${productId}`,
    })
}

export const _getTrendProducts = (args) => {
    return APIService.makeAuthRequest({
        method: POST,
        url: `/products/trends`,
        data: args
    })
}

export const _getSimilarProducts = (productId, page = 1) => {
    return APIService.makeAuthRequest({
        method: GET,
        url: `/v2/products/${productId}/similar`,
        params: {
            page
        }
    })
}

export const _checkTrademarkProduct = (productId) => {
    return APIService.makeAuthRequest({
        method: GET,
        url: `/products/${productId}/trademark`,
    })
}

export const _getASIN = (productId) => {
    return APIService.makeAuthRequest({
        method: GET,
        url: `/products/${productId}/asin`
    })
}

export const _exportProducts = (args) => {
    return APIService.makeAuthRequest({
        method: POST,
        url: '/products/export',
        headers: {
            'X-Refresh-Token': AuthService.getRefreshToken()
        },
        data: {
            q: o(args)
        }
    })
}
