import React, {Component} from "react";
import {connect} from "react-redux";
import {getStatisticItemTypes} from "../selectors";
import StatisticItemTypes from "./StatisticItemTypes";
import {fetchStatisticItemTypes} from "../actions";
import {withRouter} from "react-router-dom";

class StatisticItemTypesContainer extends Component {
    render() {
        const {props} = this;

        return (
            <StatisticItemTypes {...props}/>
        );
    }
}

const mapStateToProps = (state, props) => ({
    data: getStatisticItemTypes(state)
});

const mapDispatchToProps = {
    fetchStatisticItemTypes
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StatisticItemTypesContainer));