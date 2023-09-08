import APIPaymentService from "./PaymentServices"
import {GET, POST} from "../../constants/HTTPConstants"

export const _getCurrentMembership = () => {
    return APIPaymentService.makeAuthRequest({
        method: GET,
        url: `/membership`,
    }, true)
}

export const _cancelMembership = () => {
    return APIPaymentService.makeAuthRequest({
        method: POST,
        url: `/membership/cancel`,
    })
}
