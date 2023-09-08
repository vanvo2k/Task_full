import APIService from "./APIServices"
import {GET, POST} from "../constants/HTTPConstants"
import o from "../helpers/o";

export const _getProductDetail = (productId, historicalDate) => {
    return APIService.makeAuthRequest({
        method: GET,
        url: `/archive/${productId}`,
        params: {
            dateText: historicalDate
        }
    })
}

export const _searchArchiveProducts = (args) => {
    return APIService.makeAuthRequest({
        method: POST,
        url: '/archive/search',
        data: {
            q: o(args)
        }
    })
}