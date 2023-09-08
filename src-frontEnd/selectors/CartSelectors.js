import {createSelector} from "reselect";
import {getState} from "../reducers/cart";

export const getCartData = createSelector(getState, cart => cart);

export const getPlanSubscribe = createSelector(getCartData, cart => cart.get('plan'));
export const getCurrentCouponCode = createSelector(getCartData, cart => cart.get('coupon'));


