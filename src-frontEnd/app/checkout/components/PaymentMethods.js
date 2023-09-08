import React, {Component} from "react"
import PropTypes from "prop-types"
import PayPalGatewayContainer from "../paypal/PayPalGatewayContainer"
import PayoneerGateway from "./PayoneerGateway"

class PaymentMethods extends Component {
    componentDidMount() {
        this.props.fetchAvailableGateway()
    }

    render() {
        const {gateway} = this.props

        return (
            <div className="PaymentMethods">
                {
                    gateway.indexOf('paypal') !== -1 &&
                    <PayPalGatewayContainer/>
                }

                <PayoneerGateway/>
            </div>
        )
    }
}

PaymentMethods.propTypes = {
    gateway: PropTypes.object,
    fetchAvailableGateway: PropTypes.func.isRequired
}

export default PaymentMethods
