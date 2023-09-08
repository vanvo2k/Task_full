import APIPaymentService from "./PaymentServices"
import {POST} from "../../constants/HTTPConstants"

export const _getCouponAvailable = (args) => {
    return APIPaymentService.makeAuthRequest({
        method: POST,
        url: '/coupon/available',
        data: args
    })
}

export const _applyCouponCode = ({planId, code, method}) => {
    return APIPaymentService.makeAuthRequest({
        method: POST,
        url: '/coupon/apply',
        data: {
            planId,
            code,
            method
        }
    })
}

export const _getTapfiliateCouponCode = (vid) => {
    return APIPaymentService.makeAuthRequest({
        method: POST,
        url: '/coupon/tapfiliate',
        data: {
            vid
        }
    })
}
