import APIService from "./APIServices"
import {POST} from "../constants/HTTPConstants"

export const _analyticKeyword = ({keyword, searchType = '', market = 'us'}) => {
    return APIService.makeAuthRequest({
        method: POST,
        url: `/analytic/keyword`,
        data: {
            keyword,
            searchType,
            market
        }
    })
}

export const _analyticKeywordWithHistogram = (keyword, searchType = '', market = 'us') => {
    return APIService.makeAuthRequest({
        method: POST,
        url: `/analytic/keyword/count`,
        data: {
            keyword,
            searchType,
            market
        }
    })
}