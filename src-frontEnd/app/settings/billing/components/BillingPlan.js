import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button} from "reactstrap";
import {Link} from "react-router-dom";
import classNames from "classnames";
import timeHuman from "../../../../helpers/time/timeHuman";
import {FormattedMessage, injectIntl} from "react-intl";
import getMessageText from "../../../../helpers/i18n/getMessageText";

class BillingPlan extends Component {
    _getLanguageText(key) {
        return getMessageText(this.props.intl)(key);
    }

    render() {
        const {membership} = this.props;
        const Plan = this._renderPlan();
        const canCancel = !!membership.get('canCancel');

        return (
            <div className={classNames('BillingPlan')}>
                <h4 className="Title"><FormattedMessage id="settings.billing.your_plan"/></h4>

                {Plan}

                <div className="ChangePlanWrapper d-flex align-items-center">
                    <Button className="ChangePlan" color="primary" tag={Link} to="/pricing">
                        <FormattedMessage id="settings.billing.change_plan"/>
                    </Button>
                    {
                        canCancel &&
                        <Button className="Cancel"
                                onClick={this._handleClickCancel.bind(this)}
                                color="link">
                            <FormattedMessage id="settings.billing.cancel"/>
                        </Button>
                    }
                </div>

                <div className="Guide">
                    <FormattedMessage id="settings.billing.payoneer"/>{" "}
                    <a href="http://bitly.com/spyamz-payoneer"
                       rel="noopener noreferrer"
                       target="_blank"><FormattedMessage
                        id="settings.billing.click_here"/></a>.
                </div>

            </div>
        );
    }

    _handleClickCancel(e) {
        e.preventDefault();

        const message = this._getLanguageText('settings.billing.confirm_cancel');
        const r = window.confirm(message);

        if (!r) {
            return;
        }

        this.props.onCancel();
    }

    _renderPlan() {
        const {membership} = this.props;
        const isExpired = membership.get('isExpired');

        if (!membership || !membership.size || isExpired) {
            return (
                <p className="Message"><FormattedMessage id="settings.billing.not_subscribe"/></p>
            );
        }

        const plan = membership.get('plan');

        return (
            <div className="CurrentPlan">
                <div><FormattedMessage id="settings.billing.subscribing"/>: <strong>{plan.get('title')}</strong></div>

                <div><FormattedMessage id="settings.billing.registration"/>: {timeHuman(membership.get('start'))}</div>
                <div><FormattedMessage id="settings.billing.expiration"/>: {timeHuman(membership.get('finish'))}</div>
            </div>
        );
    }
}

BillingPlan.propTypes = {
    membership: PropTypes.object,
    onCancel: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
};

export default injectIntl(BillingPlan);
