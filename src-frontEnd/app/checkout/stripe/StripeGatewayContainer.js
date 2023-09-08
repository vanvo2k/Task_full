import React, {Component} from "react"
import {connect} from "react-redux"
import StripeGateway from "./StripeGateway"
import addScript from "../../../helpers/common/addScript"
import getEnv from "../../../helpers/common/getEnv"
import {Elements, StripeProvider} from "react-stripe-elements"
import {getCurrentMethod, getPlanDetail, getStripeUser} from "../selectors"
import {fetchStripeUser} from "../stripeActions"
import {changePaymentMethod} from "../actions"

const publicKey = getEnv('stripePublicKey')

class StripeGatewayContainer extends Component {
    state = {
        stripe: null,
    }

    componentDidMount() {
        addScript('https://js.stripe.com/v3/', 'stripe-js')
            .then(() => {
                this.setState({
                    stripe: window.Stripe(publicKey)
                })
            })
    }

    render() {
        const {props} = this
        const {stripe} = this.state
        const {plan} = props

        if (!plan || !plan.size) {
            return null
        }

        return (
            <StripeProvider stripe={stripe}>
                <Elements>
                    <StripeGateway {...props} />
                </Elements>
            </StripeProvider>
        )
    }

}

const mapStateToProps = (state, props) => ({
    method: getCurrentMethod(state),
    user: getStripeUser(state),
    plan: getPlanDetail(state)
})

const mapDispatchToProps = {
    fetchStripeUser,
    changePaymentMethod
}


export default connect(mapStateToProps, mapDispatchToProps)(StripeGatewayContainer)
