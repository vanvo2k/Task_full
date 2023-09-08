import {_getPlanDetail} from "../../services/payments/PlanServices"
import {
    CHANGE_PAYMENT_METHOD,
    FETCH_AVAILABLE_GATEWAY_FAILURE,
    FETCH_AVAILABLE_GATEWAY_REQUEST,
    FETCH_AVAILABLE_GATEWAY_SUCCESS,
    FETCH_PLAN_DETAIL_FAILURE,
    FETCH_PLAN_DETAIL_REQUEST,
    FETCH_PLAN_DETAIL_SUCCESS, FREE_CHECKOUT_FAILURE, FREE_CHECKOUT_REQUEST, FREE_CHECKOUT_SUCCESS,
    PAYPAL_CHECKOUT_FAILURE,
    PAYPAL_CHECKOUT_REQUEST, PAYPAL_CHECKOUT_SUCCESS, PREPARE_CHECKOUT,
} from "./actionTypes"
import {_freeCheckout, _getAvailableGateway, _paypalCheckout} from "../../services/payments/PaymentServices"

export const prepareCheckout = () => dispatch => {
    dispatch({
        type: PREPARE_CHECKOUT
    })

    return Promise.resolve(true)
}

export const fetchPlanDetail = (planId, coupon = '') => {
    return {
        promise: _getPlanDetail(planId, coupon),
        types: [FETCH_PLAN_DETAIL_REQUEST, FETCH_PLAN_DETAIL_SUCCESS, FETCH_PLAN_DETAIL_FAILURE]
    }
}

export const fetchAvailableGateway = () => {
    return {
        promise: _getAvailableGateway(),
        types: [FETCH_AVAILABLE_GATEWAY_REQUEST, FETCH_AVAILABLE_GATEWAY_SUCCESS, FETCH_AVAILABLE_GATEWAY_FAILURE],
    }
}

export const freeCheckout = ({planId}) => {
    return {
        promise: _freeCheckout({planId}),
        types: [FREE_CHECKOUT_REQUEST, FREE_CHECKOUT_SUCCESS, FREE_CHECKOUT_FAILURE]
    }
}

export const paypalCheckout = ({planId, coupon = ''}) => {
    return {
        types: [PAYPAL_CHECKOUT_REQUEST, PAYPAL_CHECKOUT_SUCCESS, PAYPAL_CHECKOUT_FAILURE],
        promise: _paypalCheckout({planId, coupon})
            .then(result => {
                const {success, data} = result

                if (success) {
                    const {redirect} = data

                    if (redirect) {
                        window.location.href = redirect
                    }
                }

                return Promise.resolve(result)
            })
    }
}

export const changePaymentMethod = (method) => dispatch => {
    dispatch({
        type: CHANGE_PAYMENT_METHOD,
        method
    })

    return Promise.resolve(method)
}
