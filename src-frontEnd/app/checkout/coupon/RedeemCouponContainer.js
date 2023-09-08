import React, {Component} from "react"
import {connect} from "react-redux"
import RedeemCoupon from "./RedeemCoupon"
import {getCouponAvailable, getCurrentMethod, getTextDiscount, isFreePlan} from "../selectors"
import {applyCouponCode, fetchCouponAvailable, fetchTapfiliateCouponCode} from "../couponActions"
import {getCurrentCouponCode, getPlanSubscribe} from "../../../selectors/CartSelectors"
import {removeCouponCode, useCouponCode} from "../../../actions/CartActions"

class RedeemCouponContainer extends Component {
    render() {
        const {props} = this

        return <RedeemCoupon {...props}/>
    }
}

const mapStateToProps = (state, props) => ({
    method: getCurrentMethod(state),
    isFree: isFreePlan(state),
    available: getCouponAvailable(state),
    planId: getPlanSubscribe(state),
    coupon: getCurrentCouponCode(state),
    textDiscount: getTextDiscount(state)
})

const mapDispatchToProps = {
    fetchCouponAvailable,
    applyCouponCode,
    removeCouponCode,
    useCouponCode,
    fetchTapfiliateCouponCode
}

export default connect(mapStateToProps, mapDispatchToProps)(RedeemCouponContainer)
