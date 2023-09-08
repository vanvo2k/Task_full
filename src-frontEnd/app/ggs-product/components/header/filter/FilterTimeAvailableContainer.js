import React, {Component} from "react";
import {connect} from "react-redux";
import FilterTimeAvailable from "./FilterTimeAvailable";
import {getFilterTimeAvailableData, getFilterType} from "../../../selectors";
import {
    changeTempFilterTimeAvailable, openEditFilterTimeAvailable, submitFilterTimeAvailable,
    toggleEditFilterTimeAvailable
} from "../../../actions";


class FilterTimeAvailableContainer extends Component {
    shouldComponentUpdate(nextProps) {
        if (nextProps.type !== this.props.type) {
            return true;
        }

        return !this.props.data.equals(nextProps.data);
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
    type: getFilterType(state)
});

const mapDispatchToProps = {
    openEditFilterTimeAvailable,
    toggleEditFilterTimeAvailable,
    submitFilterTimeAvailable,
    changeTempFilterTimeAvailable
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterTimeAvailableContainer);