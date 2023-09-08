import {APIServiceExtend} from '../APIServices'
import getEnv from "../../helpers/common/getEnv"
import {POST, DELETE, GET} from "../../constants/HTTPConstants"

const baseURL = getEnv('basePaymentAPI')
const api = APIServiceExtend(baseURL)

export default api

export const _createStripeUser = () => {
    return api.makeAuthRequest({
        method: POST,
        url: '/stripe/user'
    })
}

export const _addCardToUser = ({stripeUID, token, form}) => {
    return api.makeAuthRequest({
        method: POST,
        url: '/stripe/card',
        data: {
            stripeUID,
            token,
            form
        }
    })
}

export const _removeCard = ({stripeUID, cardId}) => {
    return api.makeAuthRequest({
        method: DELETE,
        url: '/stripe/card',
        data: {
            stripeUID,
            cardId
        }
    })
}

export const _stripeCheckout = ({planId, cardId, coupon = ''}) => {
    return api.makeAuthRequest({
        method: POST,
        url: '/stripe/checkout',
        data: {
            planId,
            cardId,
            coupon
        }
    })
}

export const _paypalCheckout = ({planId, coupon = ''}) => {
    return api.makeAuthRequest({
        method: POST,
        url: '/paypal/checkout',
        data: {
            planId,
            coupon
        }
    })
}

export const _getAvailableGateway = () => {
    return api.makeAuthRequest({
        method: GET,
        url: '/gateway/available'
    })
}

export const _freeCheckout = ({planId}) => {
    return api.makeAuthRequest({
        method: POST,
        url: '/free/checkout',
        data: {
            planId
        }
    })
}

export const _freeTrialAvailable = () => {
    return api.makeAuthRequest({
        method: GET,
        url: '/free/trial-available'
    })
}
