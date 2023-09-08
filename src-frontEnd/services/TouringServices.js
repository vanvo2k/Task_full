import {APIServiceExtend} from './APIServices'
import getEnv from "../helpers/common/getEnv"
import {GET, POST} from "../constants/HTTPConstants"

const baseURL = getEnv('baseTrackingAPI')
const api = APIServiceExtend(baseURL)

export default api

export const _getTouringState = () => {
    return api.makeAuthRequest({
        method: GET,
        url: '/tour'
    })
}

export const _turnOffTouringState = () => {
    return api.makeAuthRequest({
        method: POST,
        url: '/tour'
    })
}