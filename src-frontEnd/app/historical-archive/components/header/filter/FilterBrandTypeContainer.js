import React, {Component} from "react";
import {connect} from "react-redux";
import FilterBrandType from "./FilterBrandType";
import {getFilterBrandType} from "../../../selectors";
import {changeSelectBrandTypeItem} from "../../../actions";
import {withRouter} from "react-router-dom";

class FilterBrandTypeContainer extends Component {
    render() {
        const {props} = this;

        return <FilterBrandType {...props}/>
    }
}

const mapStateToProps = (state, props) => ({
    type: getFilterBrandType(state)
});

const mapDispatchToProps = {
    changeSelectBrandTypeItem
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FilterBrandTypeContainer));