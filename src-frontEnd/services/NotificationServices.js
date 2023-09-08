import APIService from "./APIServices"

export const _getNotificationBar = () => {
    return APIService.makeAuthRequest({
        method: 'GET',
        url: `/notifications/bar`
    })
}
