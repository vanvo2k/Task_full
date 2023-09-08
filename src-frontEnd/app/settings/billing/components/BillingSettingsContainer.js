import React, {Component} from "react";
import {connect} from "react-redux";
import BillingSettings from "./BillingSettings";
import {cancelCurrentMembership, fetchBillHistory, fetchCurrentMembership} from "../actions";
import {getBillHistory, getCurrentMembership} from "../selectors";
import DocTitle from "../../../../shared-components/DocTitle";
import addScript from "../../../../helpers/common/addScript";
import getEnv from "../../../../helpers/common/getEnv";
import {Elements, StripeProvider} from "react-stripe-elements";

const publicKey = getEnv('stripePublicKey');

class BillingSettingsContainer extends Component {
    state = {
        stripe: null
    };

    componentDidMount() {
        addScript('https://js.stripe.com/v3/', 'stripe-js')
            .then(() => {
                this.setState({
                    stripe: window.Stripe(publicKey)
                });
            });
    }

    render() {
        const {props} = this;
        const {stripe} = this.state;

        return (
            <DocTitle title="Billing">
                <StripeProvider stripe={stripe}>
                    <Elements>
                        <BillingSettings stripe={stripe} {...props}/>
                    </Elements>
                </StripeProvider>
            </DocTitle>
        );
    }
}

const mapStateToProps = (state) => ({
    billHistory: getBillHistory(state),
    membership: getCurrentMembership(state),
});

const mapDispatchToProps = {
    fetchBillHistory,
    fetchCurrentMembership,
    cancelCurrentMembership
};

export default connect(mapStateToProps, mapDispatchToProps)(BillingSettingsContainer);