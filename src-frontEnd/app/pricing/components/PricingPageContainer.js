import React, {Component} from "react";
import {connect} from "react-redux";
import PricingPage from "./PricingPage";
import {isAuthenticated} from "../../../selectors/AuthSelectors";
import {getListPlans} from "../selectors";
import {fetchPlans} from "../actions";
import DocTitle from "../../../shared-components/DocTitle";
import EnsureLoggedInContainer from "../../../shared-containers/EnsureLoggedInContainer";

class PricingPageContainer extends Component {
    render() {
        const {props} = this;

        return (
            <DocTitle title="Pricing">
                <EnsureLoggedInContainer>
                    <PricingPage {...props}/>
                </EnsureLoggedInContainer>
            </DocTitle>
        );
    }
}

const mapStateToProps = (state, props) => ({
    isAuthenticated: isAuthenticated(state),
    plans: getListPlans(state)
});

const mapDispatchToProps = {
    fetchPlans
};

export default connect(mapStateToProps, mapDispatchToProps)(PricingPageContainer);