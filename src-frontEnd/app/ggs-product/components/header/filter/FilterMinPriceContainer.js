import React, {Component} from "react";
import {connect} from "react-redux";
import {getFilterMinPriceData} from "../../../selectors";
import {withRouter} from "react-router-dom";
import {changeTempFilterMinPrice, openEditFilterMinPrice, submitFilterMinPrice, toggleEditFilterMinPrice} from "../../../actions";
import FilterMinPrice from "./FilterMinPrice";

class FilterMinPriceContainer extends Component {
    render() {
        const {props} = this;

        return (
            <FilterMinPrice {...props} />
        );
    }
}

const mapStateToProps = (state, props) => ({
    data: getFilterMinPriceData(state)
});

const mapDispatchToProps = {
    openEditFilterMinPrice,
    toggleEditFilterMinPrice,
    submitFilterMinPrice,
    changeTempFilterMinPrice,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FilterMinPriceContainer));