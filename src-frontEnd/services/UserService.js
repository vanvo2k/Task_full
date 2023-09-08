import APIService from "./APIServices"
import AuthService from "./AuthServices"
import {GET, POST} from "../constants/HTTPConstants"
import {getToken} from "./RecapchaServices"

export const _getProfile = () => {
    return APIService.makeAuthRequest({
        method: GET,
        url: '/user/profile'
    }, true)
}

export const _saveSettings = (settings) => {
    return APIService.makeAuthRequest({
        method: POST,
        url: '/user/settings',
        data: {settings}
    })
}

export const _getSettings = (settings) => {
    return APIService.makeAuthRequest({
        method: GET,
        url: '/user/settings',
        data: {settings}
    })
}

export const _heartbeat = () => {
    return getToken('heartbeat')
        .then((token) => {
            return APIService.makeAuthRequest({
                method: POST,
                url: '/user/heartbeat',
                headers: {
                    'X-Refresh-Token': AuthService.getRefreshToken(),
                    'X-Recapcha': token,
                }
            }, true)
        })
}

export const _logOut = () => {
    return APIService.makeAuthRequest({
        method: GET,
        url: '/user/logout',
        headers: {
            'X-Refresh-Token': AuthService.getRefreshToken()
        }
    }, true)
}

export const _saveMeta = (meta) => {
    return APIService.makeAuthRequest({
        method: POST,
        url: '/user/meta',
        data: {meta}
    })
}

export const _updateAffiliate = (affiliate) => {
    return APIService.makeAuthRequest({
        method: POST,
        url: '/user/affiliate',
        data: {affiliate}
    })
}

export const saveUserPhoneNumber = (data) => {
    return APIService.makeAuthRequest({
        method: POST,
        url: '/user/phone-number',
        data
    })
}
