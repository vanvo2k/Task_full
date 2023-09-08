import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PlanCard from "./PlanCard";
import {getPlanDetail} from "../selectors";
import {isAuthenticated} from "../../../selectors/AuthSelectors";

class PlanCardContainer extends Component {
    render() {
        const {props} = this;

        return (
            <PlanCard {...props}/>
        );
    }
}

const mapStateToProps = (state, props) => ({
    plan: getPlanDetail(state, props),
    isAuthenticated: isAuthenticated(state)
});

const mapDispatchToProps = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlanCardContainer));