import React, {Component} from "react";
import {connect} from "react-redux";
import FilterDate from "./FilterDate";
import {getFilterHistoricalDay, getFilterType} from "../../../selectors";
import {
    changeTempFilterHistoricalDay, openEditFilterHistoricalDay, submitFilterHistoricalDay,
    toggleEditFilterHistoricalDay
} from "../../../actions";

class FilterDateContainer extends Component {
    shouldComponentUpdate(nextProps){
        if (nextProps.type !== this.props.type) {
            return true;
        }

        return !this.props.data.equals(nextProps.data);
    }

    render() {
        const {props} = this;

        return <FilterDate {...props}/>
    }
}

const mapStateToProps = (state, props) => ({
    data: getFilterHistoricalDay(state),
    type: getFilterType(state)
});

const mapDispatchToProps = {
    openEditFilterHistoricalDay,
    toggleEditFilterHistoricalDay,
    submitFilterHistoricalDay,
    changeTempFilterHistoricalDay
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterDateContainer)