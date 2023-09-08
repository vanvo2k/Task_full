import React, {Component} from "react"
import PropTypes from "prop-types"
import EmptyCart from "./EmptyCart"
import PaymentMethodsContainer from "./PaymentMethodsContainer"
import CurrentPlanContainer from "./CurrentPlanContainer"
import CurrentMembershipContainer from "./CurrentMembershipContainer"
import {Button} from "reactstrap"
import {Link} from "react-router-dom"
import {FormattedMessage} from "react-intl"

class CheckoutPage extends Component {
    componentDidMount() {
        const {planId, coupon, prepareCheckout} = this.props
        prepareCheckout()

        if (!planId) {
            return
        }

        this.props.fetchPlanDetail(planId, coupon)
    }

    render() {
        const {planId, failureMessage, isFree, success, status} = this.props

        if (!planId && !success) {
            return <EmptyCart/>
        }

        return (
            <div className="CheckoutPage overflow">
                <div className="container">
                    {
                        !!failureMessage &&
                        <div className="row">
                            <div className="col-12">
                                <div className="CheckoutFailed">
                                    <div className="Text">{failureMessage}</div>

                                    {
                                        status === 'plan' &&
                                        <div className="Goto">
                                            <Button className="Pricing"
                                                    tag={Link} to="/pricing">Change another plan</Button>
                                            <Button
                                                className="Billing" color="link" tag={Link}
                                                to="/settings/billing">Billing</Button>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    }

                    {
                        success ?
                            <CurrentMembershipContainer/> :

                            <div className="row d-flex justify-content-center flex-row-reverse">
                                <div className="col-sm-6 col-12">
                                    <CurrentPlanContainer/>
                                </div>

                                {
                                    !isFree &&
                                    <div className="col-sm-6 col-12">
                                        <PaymentMethodsContainer/>
                                    </div>
                                }
                            </div>
                    }

                    <div className="text-center GoHome">
                        <Link to={"/"}><i className="linear-arrow-left"/> <FormattedMessage
                            id="pricing.go_home"/></Link>
                    </div>
                </div>
            </div>
        )
    }
}

CheckoutPage.propTypes = {
    planId: PropTypes.any,
    isFree: PropTypes.bool,
    success: PropTypes.bool,
    status: PropTypes.string,
    failureMessage: PropTypes.string,
    coupon: PropTypes.string,
    fetchPlanDetail: PropTypes.func.isRequired,
    prepareCheckout: PropTypes.func.isRequired,
}

export default CheckoutPage
