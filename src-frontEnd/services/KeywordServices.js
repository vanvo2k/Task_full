import APIService from "./APIServices"
import {GET} from "../constants/HTTPConstants"

export const _getOptions = () => {
    return APIService.makeAuthRequest({
        method: GET,
        url: '/keywords/options'
    })
}

export const _getListWords = ({date, rank, page, limit, term = ''}) => {
    return APIService.makeAuthRequest({
        method: GET,
        url: '/v2/keywords',
        params: {
            term,
            date,
            rank,
            page,
            limit
        }
    })
}
