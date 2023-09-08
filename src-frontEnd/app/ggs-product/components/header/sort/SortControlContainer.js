import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import SortControl from "./SortControl";
import {getFilterSortBy, getFilterType} from "../../../selectors";
import {changeFieldNameSortBy} from "../../../actions";

class SortControlContainer extends Component {
    shouldComponentUpdate(nextProps) {
        if (nextProps.type !== this.props.type) {
            return true;
        }

        return !this.props.data.equals(nextProps.data);
    }

    render() {
        const {props} = this;

        return <SortControl {...props} />;
    }
}

const mapStateToProps = (state, props) => ({
    data: getFilterSortBy(state),
    type: getFilterType(state),
});

const mapDispatchToProps = {
    changeFieldNameSortBy
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SortControlContainer));