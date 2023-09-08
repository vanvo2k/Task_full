import React, {Component} from "react";
import PropTypes from "prop-types";
import {Container} from "reactstrap";
import ListPlans from "./ListPlans";
import {FormattedMessage} from "react-intl";
import {Link} from "react-router-dom";

class PricingPage extends Component {
    render() {
        const {plans} = this.props;

        return (
            <div className="PricingPage overflow ">
                <Container>
                    <h1 className=" text-center title_Pricing"><FormattedMessage id="pricing.pricing"/></h1>
                    <marquee className="text_Note_Plans">🔔 Note that when you register, you will automatically remove the old package and apply the latest package you just registered.</marquee>
                    <ListPlans plans={plans}/>

                    <div className="text-center GoHome">
                        <Link to={"/"}><i className="linear-arrow-left"/> <FormattedMessage
                            id="pricing.go_home"/></Link>
                    </div>
                </Container>
            </div>
        );
    }

    componentDidMount() {
        return this.props.fetchPlans();
    }
}

PricingPage.propTypes = {
    isAuthenticated: PropTypes.bool,
    fetchPlans: PropTypes.func.isRequired,
    plans: PropTypes.object
};

export default PricingPage;