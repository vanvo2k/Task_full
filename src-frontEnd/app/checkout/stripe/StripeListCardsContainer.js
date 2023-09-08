import React, {Component} from "react"
import {connect} from "react-redux"
import StripeListCards from "./StripeListCards"
import {getPlanDetail, getStripeUser} from "../selectors"
import {removeCard} from "../stripeActions"
import {getCurrentCouponCode} from "../../../selectors/CartSelectors"

class StripeListCardsContainer extends Component {
    render() {
        const {props} = this

        return <StripeListCards {...props}/>
    }
}

const mapStateToProps = (state, props) => ({
    user: getStripeUser(state),
    plan: getPlanDetail(state),
    coupon: getCurrentCouponCode(state)
})

const mapDispatchToProps = {
    removeCard
}

export default connect(mapStateToProps, mapDispatchToProps)(StripeListCardsContainer)
