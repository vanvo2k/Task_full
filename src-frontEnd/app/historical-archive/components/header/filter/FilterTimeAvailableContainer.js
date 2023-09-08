import React, {Component} from "react";
import {connect} from "react-redux";
import FilterTimeAvailable from "./FilterTimeAvailable";
import {getFilterTimeAvailableData, getFilterHistoricalDay} from "../../../selectors";
import {
    changeTempFilterTimeAvailable, openEditFilterTimeAvailable, submitFilterTimeAvailable,
    toggleEditFilterTimeAvailable
} from "../../../actions";


class FilterTimeAvailableContainer extends Component {
    shouldComponentUpdate(nextProps) {
        if (nextProps.type !== this.props.type) {
            return true;
        }

        return !this.props.data.equals(nextProps.data) || !this.props.historicalDate.equals(nextProps.historicalDate);
    }

    render() {
        const {props} = this;

        return (
            <FilterTimeAvailable {...props}/>
        );
    }
}

const mapStateToProps = (state, props) => ({
    data: getFilterTimeAvailableData(state),
    historicalDate: getFilterHistoricalDay(state)
});

const mapDispatchToProps = {
    openEditFilterTimeAvailable,
    toggleEditFilterTimeAvailable,
    submitFilterTimeAvailable,
    changeTempFilterTimeAvailable
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterTimeAvailableContainer);