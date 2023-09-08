import {APIServiceExtend} from './APIServices'
import getEnv from "../helpers/common/getEnv"
import {GET, POST} from "../constants/HTTPConstants"

const baseURL = getEnv('baseAffiliateAPI')
const api = APIServiceExtend(baseURL)

export const _getReferralLink = () => {
    return api.makeAuthRequest({
        method: GET,
        url: '/users/link'
    })
}

export const _getReferralStatus = () => {
    return api.makeAuthRequest({
        method: GET,
        url: '/registrations/status'
    })
}

export const _requestReferralRegistration = () => {
    return api.makeAuthRequest({
        method: POST,
        url: '/registrations'
    })
}

export const _getReferralStatistic = () => {
    return api.makeAuthRequest({
        method: GET,
        url: '/statistics'
    })
}

export const _getPaymentMethod = () => {
    return api.makeAuthRequest({
        method: GET,
        url: '/users/payments'
    })
}

export const _updatePaymentMethod = (email) => {
    return api.makeAuthRequest({
        method: POST,
        url: '/users/payments',
        data: {
            paypal: email,
        }
    })
}

export const _countClick = (ref, referer = '') => {
    return api.makeRequest({
        method: POST,
        url: '/click',
        params: {
            ref,
            referer
        }
    })
}

export const _changeReferralCode = (newCode = '') => {
    return api.makeAuthRequest({
        method: POST,
        url: '/users/code',
        data: {
            code: newCode
        }
    })
}
