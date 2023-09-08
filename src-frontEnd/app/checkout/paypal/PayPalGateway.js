import React, {Component} from "react"
import PropTypes from "prop-types"
import {withRouter} from "react-router-dom"

class PayPalGateway extends Component {
    render() {
        const {plan, changePaymentMethod, method} = this.props

        if (!plan || !plan.size) {
            return null
        }

        return (
            <div className="PayPalGateway">
                <div className="HeaderGateway">
                    <input
                        onChange={() => {
                            changePaymentMethod('paypal')
                        }}
                        id="paymentMethodPaypal"
                        checked={method === 'paypal'}
                        type="radio"
                        className="InputMethod"
                        name="payment_method"
                        value="paypal"/>
                    <label htmlFor="paymentMethodPaypal" className="Name">PayPal</label>
                </div>

                {/*{*/}
                {/*    method === 'paypal' &&*/}
                {/*    <div className="Description">*/}
                {/*        Pay via PayPal; you can pay with your credit card if you don’t have a PayPal account.*/}
                {/*    </div>*/}
                {/*}*/}
            </div>
        )
    }
}

PayPalGateway.propTypes = {
    method: PropTypes.string.isRequired,
    plan: PropTypes.object,
    coupon: PropTypes.string,
    paypalCheckout: PropTypes.func.isRequired,
    changePaymentMethod: PropTypes.func.isRequired,
}

export default withRouter(PayPalGateway)
