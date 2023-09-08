import {APIServiceExtend} from './APIServices'
import getEnv from "../helpers/common/getEnv"
import {GET, POST} from "../constants/HTTPConstants"

const baseURL = getEnv('baseTrackingAPI')
const api = APIServiceExtend(baseURL)

export default api

export const _getLogRocketAvailable = () => {
    return api.makeAuthRequest({
        method: GET,
        url: '/logrocket/available'
    })
}

export const _getFullStoryAvailable = () => {
    return api.makeAuthRequest({
        method: GET,
        url: '/fullstory/available'
    })
}

export const _getOptInReceiveEmail = () => {
    return api.makeAuthRequest({
        method: GET,
        url: '/opt-int/receive-email'
    })
}

export const _postOptInReceiveEmail = (allow = 'yes') => {
    return api.makeAuthRequest({
        method: POST,
        url: '/opt-int/receive-email',
        data: {
            allow,
        }
    })
}
