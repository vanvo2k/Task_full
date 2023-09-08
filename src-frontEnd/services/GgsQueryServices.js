import APIService from "./APIServices"
import {DELETE, GET, POST} from "../constants/HTTPConstants"

export const _createQuery = ({query, title = ''}) => {
    return APIService.makeAuthRequest({
        url: '/ggs-queries',
        method: POST,
        data: {
            query,
            title
        }
    })
}

export const _getListQueries = ({term = '', page = 1, limit = 100}) => {
    return APIService.makeAuthRequest({
        url: '/ggs-queries',
        method: GET,
        params: {
            page,
            limit,
            term
        }
    })
}

export const _deleteQuery = (analyticId) => {
    return APIService.makeAuthRequest({
        url: `/ggs-queries/${analyticId}`,
        method: DELETE
    })
}
