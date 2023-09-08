import React, {Component} from "react";
import PropTypes from "prop-types";
import {Table} from "reactstrap";
import classNames from "classnames";
import TimeAgo from "../../../../shared-components/TimeAgo";
import {FormattedMessage} from "react-intl";

class BillingHistory extends Component {
    render() {
        const {className} = this.props;

        return (
            <div className={classNames(['BillingHistory', className])}>

                <h4 className="Title">
                    <FormattedMessage id="settings.billing.history.title"/>
                </h4>

                {this._renderHistory()}

            </div>
        );
    }

    _renderHistory() {
        const {billingHistory} = this.props;

        if (!billingHistory.size) {
            return (
                <p className="Message"><FormattedMessage id="settings.billing.history.no_transaction"/></p>
            );
        }

        return (
            <div className="Histories">
                <Table>
                    <thead>
                    <tr>
                        <th><FormattedMessage id="settings.billing.history.date"/></th>
                        <th><FormattedMessage id="settings.billing.history.description"/></th>
                        <th><FormattedMessage id="settings.billing.history.status"/></th>
                        <th><FormattedMessage id="settings.billing.history.amount"/></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        billingHistory.map((bill, index) => {
                            const created = bill.get('created');
                            const updated = bill.get('updated');
                            const timeHistory = updated || created;
                            const total = (bill.get('price') + 0).toFixed(2);
                            const coupon = bill.get('coupon');

                            return (
                                <tr key={index}>
                                    <td>
                                        <TimeAgo time={timeHistory}/>
                                    </td>
                                    <td className="Name">
                                        <span className="Text">{bill.get('title')}</span>
                                        {
                                            !!coupon &&
                                            <span className="Coupon">{coupon}</span>
                                        }
                                    </td>
                                    <td className="Status">{bill.get('status')}</td>
                                    {
                                        !!bill.get('price')
                                            ? <td className="Price">{total} {bill.get('currency')}</td>
                                            :
                                            <td className="Price"><FormattedMessage id="settings.billing.history.free"/>
                                            </td>
                                    }
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </Table>
            </div>
        );
    }
}

BillingHistory.propTypes = {
    billingHistory: PropTypes.object.isRequired
};

export default BillingHistory;