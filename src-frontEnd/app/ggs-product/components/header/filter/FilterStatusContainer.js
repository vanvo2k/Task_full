import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import FilterStatus from "./FilterStatus";
import {changeSelectStatusItem} from "../../../actions";
import {getFilterStatus} from "../../../selectors";

class FilterStatusContainer extends Component {
    render() {
        const {props} = this;

        return <FilterStatus {...props}/>
    }
}

const mapStateToProps = (state, props) => ({
    status: getFilterStatus(state)
});

const mapDispatchToProps = {
    changeSelectStatusItem
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FilterStatusContainer));