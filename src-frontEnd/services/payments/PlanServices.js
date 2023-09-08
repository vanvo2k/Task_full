import APIPaymentService from "./PaymentServices"
import {GET} from "../../constants/HTTPConstants"

export const _getPlanDetail = (planId, coupon = '') => {
    return APIPaymentService.makeAuthRequest({
        method: GET,
        url: `/plans/${planId}`,
        params: {
            coupon
        }
    })
}

export const _getPlans = () => {
    return APIPaymentService.makeAuthRequest({
        method: GET,
        url: '/plans',
    })
}

