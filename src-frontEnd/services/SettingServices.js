import APIService from "./APIServices"

export const _getSettingByKey = (key = '') => {
    return APIService.makeAuthRequest({
        method: 'GET',
        url: `/settings?key=${key}`
    })
}

export const _getForceRefreshApp = () => {
    return APIService.makeAuthRequest({
        method: 'GET',
        url: `/settings/force-refresh`
    })
}
