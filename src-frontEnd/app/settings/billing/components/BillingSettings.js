import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import BillingPlan from "./BillingPlan";
import BillingHistory from "./BillingHistory";
import PaymentMethodsContainer from "./PaymentMethodsContainer";
import {FormattedMessage} from "react-intl";

class BillingSettings extends Component {
    _handleCancelMembership = () => {
        this.props.cancelCurrentMembership()
            .then(() => {
                this.props.fetchCurrentMembership();
            });
    };

    render() {
        const {billHistory, membership, className, stripe} = this.props;

        return (
            <div className={classNames('BillingSettings', className)}>
                <h1 className="title">
                    <FormattedMessage id="settings.billing.title"/>
                </h1>

                <BillingPlan onCancel={this._handleCancelMembership} membership={membership}/>

                {
                    !!stripe && false &&
                    <PaymentMethodsContainer/>
                }

                <BillingHistory billingHistory={billHistory}/>
            </div>
        );
    }

    componentDidMount() {
        this.props.fetchCurrentMembership();
        this.props.fetchBillHistory();
    }
}

BillingSettings.propTypes = {
    fetchBillHistory: PropTypes.func.isRequired,
    cancelCurrentMembership: PropTypes.func.isRequired,
    fetchCurrentMembership: PropTypes.func.isRequired,
    billHistory: PropTypes.object,
    membership: PropTypes.object
};

export default BillingSettings;