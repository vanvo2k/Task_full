import React, {Component} from "react"
import {connect} from "react-redux"
import SubscribePlan from "./SubscribePlan"
import {setPlanSubscribe} from "../../../actions/CartActions"
import {parseSearchQuery} from "../../../helpers/RouterHelper"

class SubscribePlanContainer extends Component {
    _getCoupon = () => {
        const parsed = parseSearchQuery()

        return (parsed.code || '').trim()
    }

    _getPlanId() {
        const {match} = this.props
        const {params} = match
        const {plan} = params

        return plan
    }

    render() {
        const {props} = this
        const planId = this._getPlanId()
        const coupon = this._getCoupon()

        return <SubscribePlan coupon={coupon} {...props} plan={planId}/>
    }
}

const mapStateToProps = (state, props) => ({})

const mapDispatchToProps = {
    setPlanSubscribe
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscribePlanContainer)
