import {createSelector} from "reselect"
import {NAME} from "./constants"

export const getModule = (state) => {
    return state.get(NAME)
}

export const getPlanDetail = createSelector(getModule, state => state.get('plan'))

export const isFreePlan = createSelector(getPlanDetail, plan => {
    if (!plan.size) {
        return false
    }

    return plan.get('price') <= 0
})

export const getAvailableGateway = createSelector(getModule, state => state.get('gateway'))

export const getStripeUser = createSelector(getModule, state => state.get('user'))

export const getCurrentStripeCard = createSelector(getStripeUser, user => {
    if (!user || !user.size) {
        return false
    }

    const cards = user.get('cards')
    if (!cards || !cards.size) {
        return false
    }

    const firstCard = cards.get(0)

    return firstCard.get('id')
})

export const getFailureMessage = createSelector(getModule, state => state.get('failureMessage'))

export const getCurrentMethod = createSelector(getModule, state => state.get('currentMethod'))

export const canCheckout = createSelector(getModule, getCurrentMethod, (state, method) => {
    if (method === 'paypal') {
        return true
    }

    const user = state.get('user')

    if (!user || !user.size) {
        return false
    }

    const cards = user.get('cards')
    return !!(cards && cards.size)
})

export const getCurrentMembership = createSelector(getModule, state => {
    return state.get('membership')
})

export const isCheckoutSuccess = createSelector(getModule, state => {
    return state.get('success')
})

export const getAmountDiscount = createSelector(getModule, getPlanDetail, (state, plan) => {
    if (!plan || !plan.size) {
        return 0
    }

    const discount = state.get('discount')
    const number = discount.get('number')

    if (Number.isNaN(number) || !number) {
        return 0
    }

    return number.toFixed(2)
})

export const getTextDiscount = createSelector(getModule, getPlanDetail, (state, plan) => {
    if (!plan || !plan.size) {
        return ""
    }

    const discount = state.get('discount')
    const text = discount.get('text')

    return text + ""
})

export const getCouponAvailable = createSelector(getModule, state => state.get('couponAvailable'))

export const getTotalOrder = createSelector(getPlanDetail, getAmountDiscount, getCouponAvailable, (plan, discount, couponAvailable) => {
    if (!plan || !plan.size) {
        return 0
    }

    const price = parseFloat(plan.get('price'))

    if (!couponAvailable) {
        return price
    }

    if (price <= discount) {
        return 0
    }

    return (price - discount).toFixed(2)
})

export const getStatusCode = createSelector(getModule, state => state.get('statusCode'))
