import React, {Component} from "react";
import {connect} from "react-redux";
import {getFilterMaxPriceData} from "../../../selectors";
import {withRouter} from "react-router-dom";
import {changeTempFilterMaxPrice, openEditFilterMaxPrice, submitFilterMaxPrice, toggleEditFilterMaxPrice} from "../../../actions";
import FilterMaxPrice from "./FilterMaxPrice";

class FilterMaxPriceContainer extends Component {
    render() {
        const {props} = this;

        return (
            <FilterMaxPrice {...props} />
        );
    }
}

const mapStateToProps = (state, props) => ({
    data: getFilterMaxPriceData(state)
});

const mapDispatchToProps = {
    openEditFilterMaxPrice,
    toggleEditFilterMaxPrice,
    submitFilterMaxPrice,
    changeTempFilterMaxPrice,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FilterMaxPriceContainer));