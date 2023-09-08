import React, {Component} from "react"
import {connect} from "react-redux"
import OrderTotal from "./OrderTotal"
import {getAmountDiscount, getCouponAvailable, getCurrentMethod, getTotalOrder, isFreePlan} from "../selectors"

class OrderTotalContainer extends Component {
    render() {
        const {props} = this

        return <OrderTotal {...props}/>
    }
}

const mapStateToProps = (state, props) => ({
    couponAvailable: getCouponAvailable(state),
    method: getCurrentMethod(state),
    isFree: isFreePlan(state),
    total: getTotalOrder(state),
    discount: getAmountDiscount(state)
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(OrderTotalContainer)
