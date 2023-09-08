import React, {Component} from "react"
import PropTypes from "prop-types"
import RedeemCouponContainer from "../coupon/RedeemCouponContainer"
import ButtonCheckoutContainer from "./ButtonCheckoutContainer"
import OrderTotalContainer from "./OrderTotalContainer"
import CheckoutPolices from "./CheckoutPolices"

class CurrentPlan extends Component {
    render() {
        const {plan} = this.props

        if (!plan || !plan.size) {
            return null
        }

        const price = plan.get('price')
        const isFree = !price || price <= 0

        return (
            <div className="CurrentPlan">
                <h2 className="Title">Review Order</h2>

                <div className="Table d-table">
                    <div className="Header d-table-row">
                        <div className="Plan d-table-cell">Plan</div>
                        <div className="Price d-table-cell text-right">Price</div>
                    </div>

                    <div className="Main d-table-row">
                        <div className="Plan d-table-cell">{plan.get('title')}</div>
                        <div className="Price d-table-cell text-right">
                            {
                                isFree ? 'Free' : `$${price.toFixed(2)}`
                            }
                        </div>
                    </div>
                </div>

                <div className="Checkout row justify-content-between">
                    <div className="col">
                        <RedeemCouponContainer/>
                    </div>

                    <div className="col">
                        <OrderTotalContainer/>
                        <ButtonCheckoutContainer/>
                    </div>

                    <div className="col-12">
                        <CheckoutPolices/>
                    </div>
                </div>
            </div>
        )
    }
}

CurrentPlan.propTypes = {
    plan: PropTypes.object
}

export default CurrentPlan
