import React, {Component} from "react";
import {connect} from "react-redux";
import {getFilterMarket} from "../../../selectors";
import {changeSelectMarketItem} from "../../../actions";
import {withRouter} from "react-router-dom";
import FilterMarket from "./FilterMarket";

class FilterMarketContainer extends Component {
    render() {
        const {props} = this;

        return <FilterMarket {...props}/>
    }
}

const mapStateToProps = (state, props) => ({
    market: getFilterMarket(state)
});

const mapDispatchToProps = {
    changeSelectMarketItem
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FilterMarketContainer));