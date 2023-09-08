import React, {Component} from "react"
import {connect} from "react-redux"
import CheckoutPage from "./CheckoutPage"
import {getCurrentCouponCode, getPlanSubscribe} from "../../../selectors/CartSelectors"
import {fetchPlanDetail, prepareCheckout} from "../actions"
import DocTitle from "../../../shared-components/DocTitle"
import {getFailureMessage, getStatusCode, isCheckoutSuccess, isFreePlan} from "../selectors"
import EnsureLoggedInContainer from "../../../shared-containers/EnsureLoggedInContainer"

class CheckoutPageContainer extends Component {
    render() {
        const {props} = this

        return (
            <DocTitle title='Checkout'>
                <EnsureLoggedInContainer>
                    <CheckoutPage {...props}/>
                </EnsureLoggedInContainer>
            </DocTitle>
        )
    }
}

const mapStateToProps = (state, props) => ({
    planId: getPlanSubscribe(state),
    coupon: getCurrentCouponCode(state),
    failureMessage: getFailureMessage(state),
    isFree: isFreePlan(state),
    success: isCheckoutSuccess(state),
    status: getStatusCode(state)
})

const mapDispatchToProps = {
    fetchPlanDetail,
    prepareCheckout
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPageContainer)
