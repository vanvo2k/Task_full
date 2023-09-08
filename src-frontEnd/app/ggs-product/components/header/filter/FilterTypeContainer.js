import React, {PureComponent} from "react";
import {connect} from "react-redux";
import FilterType from "./FilterType";
import {withRouter} from "react-router-dom";
import {getFilterType} from "../../../selectors";
import {changeSelectTypeItem} from "../../../actions";

class FilterTypeContainer extends PureComponent {
    render() {
        const {props} = this;

        return <FilterType {...props}/>
    }
}

const mapStateToProps = (state, props) => ({
    type: getFilterType(state)
});

const mapDispatchToProps = {
    changeSelectTypeItem
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FilterTypeContainer));