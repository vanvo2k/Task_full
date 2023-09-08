import {_addCardToUser, _createStripeUser, _removeCard, _stripeCheckout} from "../../services/payments/PaymentServices"
import {
    FETCH_STRIPE_USER_FAILURE,
    FETCH_STRIPE_USER_REQUEST,
    FETCH_STRIPE_USER_SUCCESS, STRIPE_ADD_CARD_FAILURE, STRIPE_ADD_CARD_REQUEST, STRIPE_ADD_CARD_SUCCESS,
    STRIPE_CHECKOUT_FAILURE,
    STRIPE_CHECKOUT_REQUEST, STRIPE_CHECKOUT_SUCCESS,
    STRIPE_REMOVE_CARD_FAILURE, STRIPE_REMOVE_CARD_REQUEST,
    STRIPE_REMOVE_CARD_SUCCESS
} from "./actionTypes"

export const fetchStripeUser = () => {
    return {
        promise: _createStripeUser(),
        types: [FETCH_STRIPE_USER_REQUEST, FETCH_STRIPE_USER_SUCCESS, FETCH_STRIPE_USER_FAILURE],
    }
}

export const addCardToCustomer = ({stripeUID, token, form}) => {
    return {
        promise: _addCardToUser({stripeUID, token, form}),
        types: [STRIPE_ADD_CARD_REQUEST, STRIPE_ADD_CARD_SUCCESS, STRIPE_ADD_CARD_FAILURE],
    }
}

export const removeCard = ({cardId, stripeUID}) => {
    return {
        cardId,
        promise: _removeCard({cardId, stripeUID}),
        types: [STRIPE_REMOVE_CARD_REQUEST, STRIPE_REMOVE_CARD_SUCCESS, STRIPE_REMOVE_CARD_FAILURE],
    }
}

export const stripeCheckout = ({planId, cardId, coupon}) => {
    return {
        promise: _stripeCheckout({planId, cardId, coupon}),
        types: [STRIPE_CHECKOUT_REQUEST, STRIPE_CHECKOUT_SUCCESS, STRIPE_CHECKOUT_FAILURE],
    }
}
