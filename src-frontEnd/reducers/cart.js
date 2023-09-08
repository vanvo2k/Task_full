import {createReducer} from "redux-create-reducer";
import {fromJS} from "immutable";
import {
    CART_STARTUP_CHECK, EMPTY_CART, REMOVE_COUPON_CODE, SET_COUPON_CODE,
    SET_PLAN_SUBSCRIBE
} from "../constants/CartActionTypes";

const initState = {
    plan: '',
    coupon: ''
};

export default createReducer(fromJS(initState), {
    [SET_PLAN_SUBSCRIBE](state, action) {
        const {planId, coupon} = action;

        return state
            .set('plan', planId)
            .set('coupon', coupon);
    },
    [CART_STARTUP_CHECK](state, action) {
        const {cart} = action;
        const {planId, coupon} = cart;

        const planIdValidated = planId && planId !== "undefined" ? planId : "";

        return state.set('plan', planIdValidated)
            .set('coupon', coupon);
    },
    [EMPTY_CART](state, action) {
        return fromJS({
            plan: '',
            coupon: ''
        });
    },
    [SET_COUPON_CODE](state, action) {
        const {code} = action;

        return state.set('coupon', code);
    },
    [REMOVE_COUPON_CODE](state) {
        return state.set('coupon', '');
    }
});

export const getState = (state) => state.get('cart');

export const NAME = 'cart';