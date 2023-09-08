import React, {Component} from "react";
import {connect} from "react-redux";
import FilterRank from "./FilterRank";
import {changeTempFilterRank, openEditFilterRank, submitFilterRank, toggleEditFilterRank} from "../../../actions";
import {getFilterRankData} from "../../../selectors";
import {withRouter} from "react-router-dom";

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
    data: getFilterRankData(state)
});

const mapDispatchToProps = {
    openEditFilterRank,
    toggleEditFilterRank,
    changeTempFilterRank,
    submitFilterRank,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FilterRankContainer));