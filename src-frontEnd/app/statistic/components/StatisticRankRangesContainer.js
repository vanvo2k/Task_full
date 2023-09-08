import React, {Component} from "react";
import {connect} from "react-redux";
import StatisticRankRanges from "./StatisticRankRanges";
import {fetchStatisticRankRanges} from "../actions";
import {getStatisticRankRanges} from "../selectors";

class StatisticRankRangesContainer extends Component {
    render() {
        const {props} = this;

        return (
            <StatisticRankRanges {...props}/>
        );
    }
}

const mapStateToProps = (state, props) => ({
    statistic: getStatisticRankRanges(state)
});

const mapDispatchToProps = {
    fetchStatisticRankRanges
};

export default connect(mapStateToProps, mapDispatchToProps)(StatisticRankRangesContainer);