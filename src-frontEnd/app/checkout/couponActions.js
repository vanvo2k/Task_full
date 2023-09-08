import {_applyCouponCode, _getCouponAvailable, _getTapfiliateCouponCode} from "../../services/payments/CouponServices"
import {
    APPLY_COUPON_CODE_FAILURE, APPLY_COUPON_CODE_REQUEST,
    APPLY_COUPON_CODE_SUCCESS,
    FETCH_COUPON_AVAILABLE_FAILURE, FETCH_COUPON_AVAILABLE_REQUEST,
    FETCH_COUPON_AVAILABLE_SUCCESS, FETCH_TAPFILIATE_COUPON_CODE_FAILURE, FETCH_TAPFILIATE_COUPON_CODE_REQUEST,
    FETCH_TAPFILIATE_COUPON_CODE_SUCCESS
} from "./actionTypes"

export const fetchCouponAvailable = (args = {}) => {
    return {
        promise: _getCouponAvailable(args),
        types: [FETCH_COUPON_AVAILABLE_REQUEST, FETCH_COUPON_AVAILABLE_SUCCESS, FETCH_COUPON_AVAILABLE_FAILURE]
    }
}

export const fetchTapfiliateCouponCode = (vid) => {
    return {
        promise: _getTapfiliateCouponCode(vid),
        types: [FETCH_TAPFILIATE_COUPON_CODE_REQUEST, FETCH_TAPFILIATE_COUPON_CODE_SUCCESS, FETCH_TAPFILIATE_COUPON_CODE_FAILURE]
    }
}

export const applyCouponCode = ({planId, code, method}) => {
    return {
        promise: _applyCouponCode({planId, code, method}),
        types: [APPLY_COUPON_CODE_REQUEST, APPLY_COUPON_CODE_SUCCESS, APPLY_COUPON_CODE_FAILURE]
    }
}
