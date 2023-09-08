import {
    CART_STARTUP_CHECK, EMPTY_CART, REMOVE_COUPON_CODE, SET_COUPON_CODE,
    SET_PLAN_SUBSCRIBE
} from "../constants/CartActionTypes"
import StorageService from "../services/StorageServices"

export const setPlanSubscribe = (planId, coupon = '') => dispatch => {
    dispatch({
        type: SET_PLAN_SUBSCRIBE,
        planId,
        coupon
    })

    StorageService.set('cart', {
        planId,
        coupon
    })

    return Promise.resolve(planId)
}

export const cartStartupCheck = () => dispatch => {
    const cart = StorageService.get('cart', {})

    dispatch({
        type: CART_STARTUP_CHECK,
        cart
    })

    return Promise.resolve(cart)
}

export const emptyCart = () => dispatch => {
    StorageService.set('cart', {})

    dispatch({
        type: EMPTY_CART
    })

    return Promise.resolve(true)
}

export const useCouponCode = code => dispatch => {
    const cart = StorageService.get('cart', {})
    const updatedCard = {...cart, coupon: code}

    StorageService.set('cart', updatedCard)

    dispatch({
        type: SET_COUPON_CODE,
        code
    })

    return Promise.resolve(code)
}

export const removeCouponCode = () => dispatch => {
    const cart = StorageService.get('cart', {})
    const updatedCard = {...cart, coupon: ''}

    StorageService.set('cart', updatedCard)

    dispatch({
        type: REMOVE_COUPON_CODE
    })

    return Promise.resolve(true)
}
