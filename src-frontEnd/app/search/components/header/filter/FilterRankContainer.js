import React, {Component} from "react";
import {connect} from "react-redux";
import FilterRank from "./FilterRank";
import {changeTempFilterRank, openEditFilterRank, submitFilterRank, toggleEditFilterRank,setTrialQueryRank} from "../../../actions";
import {getFilterRankData} from "../../../selectors";
import {withRouter} from "react-router-dom";
import { getUserScopes } from "../../../../../selectors/UserSelectors";

class FilterRankContainer extends Component {
    shouldComponentUpdate(nextProps) {
        return !this.props.data.equals(nextProps.data);
    }

    render() {
        const {props} = this;

        return (
            <FilterRank {...props} />
        );
    }
}

const mapStateToProps = (state, props) => ({
    data: getFilterRankData(state),
    userScope:getUserScopes(state)
});

const mapDispatchToProps = {
    openEditFilterRank,
    toggleEditFilterRank,
    changeTempFilterRank,
    submitFilterRank,
    setTrialQueryRank,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FilterRankContainer));