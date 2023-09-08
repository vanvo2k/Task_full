import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import ButtonSubscription from "./ButtonSubscription";
import {parseSearchQuery} from "../../../helpers/RouterHelper";
import {Button} from "reactstrap";
import {Link} from "react-router-dom";
import {FormattedMessage} from "react-intl";


class PlanCard extends Component {
    render() {
        const {plan, history, className} = this.props;
        const params = parseSearchQuery(history);
        const {planId} = params;
        const active = planId === plan.get('_id');
        const isCurrentPlan = plan.get('active');
        const price = plan.get('price');
        const priceOrigin = plan.get('priceOrigin');
        const isFree = !price;

        return (
            <div className={classNames('PlanCard', {active}, {isFree}, className, {current: isCurrentPlan})}>
                <div className="PricingHeader">
                    <div className="FeaturedImg"/>

                    <h2 className="Name">{plan.get('title')}</h2>

                    <h3 className="Price">
                        {isFree
                            ? <div className="Number"><FormattedMessage id="pricing.free"/></div>
                            : <Fragment>
                                <div className="Number">
                                    ${price}
                                    {
                                        !!priceOrigin &&
                                        <span className="Origin">${priceOrigin}</span>
                                    }
                                </div>
                                <div className="PerMonth">/<FormattedMessage id="pricing.month"/></div>
                            </Fragment>
                        }
                    </h3>

                    <p className="Description">{plan.get('description')}</p>
                </div>

                <div className="Features">
                    <ul>
                        {
                            plan.get('features').map((feature, index) => {
                                return (
                                    <li key={index}>{feature}</li>
                                );
                            })
                        }
                    </ul>
                </div>

                <div className="PricingButton">
                    {this._renderButtonBottom()}
                </div>
            </div>
        );
    }

    _renderButtonBottom() {
        const {plan, isAuthenticated} = this.props;
        const isCurrentPlan = plan.get('active');
        const price = plan.get('price');
        const isFree = !price;

        if (isCurrentPlan) {
            return (
                <Button tag={Link} to="/settings/billing" color="link"><FormattedMessage id="pricing.your_plan"/></Button>
            );
        }

        const planId = plan.get('_id');

        return (
            <ButtonSubscription
                isFree={isFree}
                isAuthenticated={isAuthenticated}
                planId={planId}/>
        );
    }
}

PlanCard.propTypes = {
    plan: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool,
    history: PropTypes.object,
};

export default PlanCard;