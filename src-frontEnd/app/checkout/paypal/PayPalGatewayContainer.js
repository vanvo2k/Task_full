import React, {Component} from "react"
import {connect} from "react-redux"
import PayPalGateway from "./PayPalGateway"
import {getCurrentMethod, getPlanDetail} from "../selectors"
import {changePaymentMethod, paypalCheckout} from "../actions"
import {getCurrentCouponCode} from "../../../selectors/CartSelectors"

class PayPalGatewayContainer extends Component {
    render() {
        const {props} = this

        return <PayPalGateway {...props}/>
    }
}

const mapStateToProps = (state, props) => ({
    method: getCurrentMethod(state),
    plan: getPlanDetail(state),
    coupon: getCurrentCouponCode(state)
})

const mapDispatchToProps = {
    paypalCheckout,
    changePaymentMethod
}

export default connect(mapStateToProps, mapDispatchToProps)(PayPalGatewayContainer)
