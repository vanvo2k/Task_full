import APIService from "./APIServices"

export const _getListTradeMarks = (args) => {
    return APIService.makeAuthRequest({
        url: '/trademarks',
        method: 'GET',
        params: args
    })
}

export const _createTradeMark = ({text}) => {
    return APIService.makeAuthRequest({
        url: '/trademarks',
        method: 'POST',
        data: {
            text
        }
    })
}

export const _deleteTradeMark = (id) => {
    return APIService.makeAuthRequest({
        url: `/trademarks/${id}`,
        method: 'DELETE',
    })
}

export const _refreshManualTradeMark = (id) => {
    return APIService.makeAuthRequest({
        url: `/trademarks/${id}/refresh`,
        method: 'POST',
    })
}

export const _getStatisticTrademark = (id) => {
    return APIService.makeAuthRequest({
        url: '/trademarks/statistic',
        method: 'GET',
    })
}

export const _getTotalWarnings = (id) => {
    return APIService.makeAuthRequest({
        url: '/trademarks/total/warnings',
        method: 'GET',
    })
}

export const _getTrademarkDetail = (id) => {
    return APIService.makeAuthRequest({
        url: `/trademarks/${id}`,
        method: 'GET',
    })
}

export const _markReadTrademark = (id) => {
    return APIService.makeAuthRequest({
        url: `/trademarks/${id}/read`,
        method: 'POST',
    })
}
