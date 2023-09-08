import {APIServiceExtend} from './APIServices'
import getEnv from "../helpers/common/getEnv"
import {POST} from "../constants/HTTPConstants"
import AuthService from "./AuthServices"

const baseURL = getEnv('baseAuthAPI')
const api = APIServiceExtend(baseURL)

export const _logout = () => {
    return api.makeAuthRequest({
        url: '/logout',
        method: POST,
        headers: {
            'X-Refresh-Token': AuthService.getRefreshToken()
        }
    })
}

export const _getHeartbeat = () => {
    return api.makeAuthRequest({
        url: '/heartbeat',
        method: POST,
        headers: {
            'X-Refresh-Token': AuthService.getRefreshToken()
        }
    })
}

export const _getAccessToken = () => {
    return api.makeAuthRequest({
        url: '/oauth/token',
        method: POST,
        headers: {
            'X-Refresh-Token': AuthService.getRefreshToken()
        }
    })
}
