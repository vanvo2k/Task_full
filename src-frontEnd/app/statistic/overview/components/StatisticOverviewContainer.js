import React, {Component} from "react";
import {connect} from "react-redux";
import StatisticOverview from "./StatisticOverview";
import {changeShowDays, fetchStatisticHasRank, fetchStatisticOverview} from "../actions";
import {getAvailableStatistic, gethasRankStatistic, getLoading, getShowDays} from "../selectors";
import {getThemeData} from "../../../../selectors/ThemeSelectors";

class StatisticOverviewContainer extends Component {
    render() {
        const {props} = this;

        return <StatisticOverview {...props}/>;
    }
}

const mapStateToProps = (state, props) => ({
    statistic: getAvailableStatistic(state),
    hasRank: gethasRankStatistic(state),
    showDays: getShowDays(state),
    loading: getLoading(state),
    theme: getThemeData(state)
});

const mapDispatchToProps = {
    fetchStatisticOverview,
    fetchStatisticHasRank,
    changeShowDays
};

export default connect(mapStateToProps, mapDispatchToProps)(StatisticOverviewContainer);