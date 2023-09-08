import React, {Component} from "react";
import {connect} from "react-redux";
import {getFilterPriceData} from "../../../selectors";
import {withRouter} from "react-router-dom";
import FilterPrice from "./FilterPrice";
import {changeTempFilterPrice, openEditFilterPrice, submitFilterPrice, toggleEditFilterPrice} from "../../../actions";

class FilterPriceContainer extends Component {
    render() {
        const {props} = this;

        return (
            <FilterPrice {...props} />
        );
    }
}

const mapStateToProps = (state, props) => ({
    data: getFilterPriceData(state)
});

const mapDispatchToProps = {
    openEditFilterPrice,
    toggleEditFilterPrice,
    submitFilterPrice,
    changeTempFilterPrice,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FilterPriceContainer));