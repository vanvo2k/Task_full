import React, {Component} from "react"
import {connect} from "react-redux"
import ButtonCheckout from "./ButtonCheckout"
import {canCheckout, getCurrentMethod, getCurrentStripeCard, isFreePlan} from "../selectors"
import {stripeCheckout} from "../stripeActions"
import {getCurrentCouponCode, getPlanSubscribe} from "../../../selectors/CartSelectors"
import {freeCheckout, paypalCheckout} from "../actions"
import {emptyCart} from "../../../actions/CartActions"

class ButtonCheckoutContainer extends Component {
    render() {
        const {props} = this

        return <ButtonCheckout {...props}/>
    }
}

const mapStateToProps = (state, props) => ({
    method: getCurrentMethod(state),
    canCheckout: canCheckout(state),
    planId: getPlanSubscribe(state),
    coupon: getCurrentCouponCode(state),
    cardId: getCurrentStripeCard(state),
    isFree: isFreePlan(state)
})

const mapDispatchToProps = {
    stripeCheckout,
    freeCheckout,
    paypalCheckout,
    emptyCart
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonCheckoutContainer)
