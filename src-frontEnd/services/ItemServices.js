import APIService from "./APIServices"
import {GET} from "../constants/HTTPConstants"

export const _getStatisticOverview = (from) => {
    return APIService.makeAuthRequest({
        method: GET,
        url: `/items/statistic/overview?from=${from}`,
    })
}

export const _getStatisticHasRank = (from) => {
    return APIService.makeAuthRequest({
        method: GET,
        url: `/items/statistic/has-rank?from=${from}`,
    })
}


export const _getStatisticUpdate = (date) => {
    return APIService.makeAuthRequest({
        method: GET,
        url: `/items/statistic/update?date=${date}`,
    })
}

export const _getStatisticRankRanges = () => {
    return APIService.makeAuthRequest({
        method: GET,
        url: `/items/statistic/rank-ranges`,
    })
}

export const _getStatisticItemTypes = () => {
    return APIService.makeAuthRequest({
        method: GET,
        url: `/items/statistic/types`,
    })
}

export const _getItemsTopRising = () => {
    return APIService.makeAuthRequest({
        method: GET,
        url: `/items/statistic/top-rising`,
    })
}

export const _getItemsRandom = () => {
    return APIService.makeAuthRequest({
        method: GET,
        url: `/items/statistic/random`,
    })
}

export const _getItemsBestSellerRank = () => {
    return APIService.makeAuthRequest({
        method: GET,
        url: `/items/statistic/bsr`,
    })
}
