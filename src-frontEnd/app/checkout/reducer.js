import {createReducer} from "redux-create-reducer"
import {fromJS} from "immutable"
import {
    FETCH_AVAILABLE_GATEWAY_SUCCESS, FETCH_PLAN_DETAIL_SUCCESS, STRIPE_ADD_CARD_SUCCESS,
    STRIPE_REMOVE_CARD_SUCCESS,
    FETCH_STRIPE_USER_SUCCESS, STRIPE_CHECKOUT_SUCCESS, STRIPE_CHECKOUT_FAILURE, FREE_CHECKOUT_SUCCESS,
    FREE_CHECKOUT_FAILURE, PREPARE_CHECKOUT, STRIPE_CHECKOUT_REQUEST, FREE_CHECKOUT_REQUEST,
    FETCH_COUPON_AVAILABLE_SUCCESS, APPLY_COUPON_CODE_SUCCESS, CHANGE_PAYMENT_METHOD, FETCH_COUPON_AVAILABLE_FAILURE,
    PAYPAL_CHECKOUT_SUCCESS
} from "./actionTypes"
import {REMOVE_COUPON_CODE} from "../../constants/CartActionTypes"

const initState = {
    plan: {},
    user: {},
    gateway: [],
    failureMessage: '',
    statusCode: '',
    currentMethod: 'paypal',
    membership: {},
    success: false,
    redirect: false,
    couponAvailable: false,
    discount: {
        number: 0,
        text: ''
    }
}

export default createReducer(fromJS(initState), {
    [REMOVE_COUPON_CODE](state) {
        return state.set('discount', fromJS({}))
    },
    [CHANGE_PAYMENT_METHOD](state, action) {
        const {method} = action

        return state.set('currentMethod', method)
    },
    [APPLY_COUPON_CODE_SUCCESS](state, action) {
        const {result} = action
        const {success, data} = result

        if (!success) {
            return state
        }

        const {discount, text} = data

        if (discount >= 0) {
            return state.set('discount', fromJS({
                number: parseFloat(discount),
                text
            }))
        }

        return state
    },
    [FETCH_COUPON_AVAILABLE_SUCCESS](state, action) {
        const {result} = action
        const {data, success} = result

        if (!success) {
            return state
        }

        return state.set('couponAvailable', data)
    },
    [FETCH_COUPON_AVAILABLE_FAILURE](state, action) {
        return state.set('couponAvailable', false)
    },
    [PREPARE_CHECKOUT](state, action) {
        return state.set('membership', fromJS({}))
            .set('success', false)
            .set('failureMessage', '')
            .set('plan', fromJS({}))
            .set('discount', fromJS({}))
    },
    [FREE_CHECKOUT_REQUEST](state, action) {
        return state.set('failureMessage', '')
            .set('statusCode', '')
            .set('success', false)
    },
    [FREE_CHECKOUT_SUCCESS](state, action) {
        const {result} = action
        const {data, success} = result

        if (!success) {
            return state
        }

        return state.set('failureMessage', null)
            .set('membership', fromJS(data))
            .set('success', true)
    },
    [FREE_CHECKOUT_FAILURE](state, action) {
        const {error} = action
        const message = error.message || error
        const code = error.code || null

        return state.set('failureMessage', message)
            .set('statusCode', code)
    },
    [FETCH_PLAN_DETAIL_SUCCESS](state, action) {
        const {result} = action
        const {success, data} = result

        if (!success) {
            return state
        }

        return state.set('plan', fromJS(data))
    },
    [FETCH_AVAILABLE_GATEWAY_SUCCESS](state, action) {
        const {result} = action
        const {success, data} = result

        if (!success) {
            return state
        }

        return state.set('gateway', fromJS(data))
    },
    [FETCH_STRIPE_USER_SUCCESS](state, action) {
        const {result} = action
        const {success, data} = result

        if (!success) {
            return state
        }

        return state.set('user', fromJS(data))
    },
    [STRIPE_ADD_CARD_SUCCESS](state, action) {
        const {result} = action
        const {success, data} = result

        if (!success) {
            return state
        }

        const cards = state.getIn(['user', 'cards'])

        return state.setIn(['user', 'cards'], cards.push(fromJS(data)))
    },
    [STRIPE_REMOVE_CARD_SUCCESS](state, action) {
        const {result, cardId} = action
        const {success} = result

        if (!success) {
            return state
        }

        const cards = state.getIn(['user', 'cards'])

        return state.setIn(['user', 'cards'], cards.filter(card => card.get('id') !== cardId))
    },
    [STRIPE_CHECKOUT_SUCCESS](state, action) {
        const {result} = action
        const {data, success} = result

        if (!success) {
            return state
        }

        return state.set('failureMessage', null)
            .set('membership', fromJS(data))
            .set('success', true)
    },
    [STRIPE_CHECKOUT_REQUEST](state, action) {
        return state.set('failureMessage', '')
            .set('statusCode', '')
            .set('success', false)
    },
    [STRIPE_CHECKOUT_FAILURE](state, action) {
        const {error} = action
        const message = error.message || error
        const code = error.code || null

        return state
            .set('failureMessage', message)
            .set('statusCode', code)
    },
    [PAYPAL_CHECKOUT_SUCCESS](state, action) {
        return state.set('success', true)
    }
})
