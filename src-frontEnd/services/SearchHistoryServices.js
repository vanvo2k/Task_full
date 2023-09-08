import APIService from "./APIServices"
import {GET, POST} from "../constants/HTTPConstants"

export const _getListSearchQueries = ({page = 1, limit = 100}) => {
    return APIService.makeAuthRequest({
        url: '/histories',
        method: POST,
        data: {
            page,
            limit
        }
    })
}

export const _getTotalQueries = () => {
    return APIService.makeAuthRequest({
        method: GET,
        url: '/histories/total'
    })
}

export const _getRecentSearches = () => {
    return APIService.makeAuthRequest({
        method: GET,
        url: '/histories/recent'
    })
}