import React, {Component} from "react";
import {connect} from "react-redux";
import StatisticUpdate from "./StatisticUpdate";
import {fetchStatisticUpdate} from "../actions";
import {getLoading, getUpdateStatistic} from "../selectors";
import {getThemeData} from "../../../../selectors/ThemeSelectors";

class StatisticUpdateContainer extends Component {
    render() {
        const {props} = this;

        return <StatisticUpdate {...props}/>;
    }
}

const mapStateToProps = (state, props) => ({
    statistic: getUpdateStatistic(state),
    loading: getLoading(state),
    theme: getThemeData(state)
});

const mapDispatchToProps = {
    fetchStatisticUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)(StatisticUpdateContainer);