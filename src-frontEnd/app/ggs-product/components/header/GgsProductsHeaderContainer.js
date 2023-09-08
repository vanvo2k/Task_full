import React, {Component} from "react";
import {connect} from "react-redux";
import {changePaginationNumber, initCheckQuerySearch} from "../../actions";
import {withRouter} from "react-router-dom";
import {isAdvancedSearch} from "../../selectors";
import GgsProductsHeader from "./GgsProductsHeader";

class GgsProductsHeaderContainer extends Component {
    render() {
        const {props} = this;

        return (
            <GgsProductsHeader {...props} />
        );
    }
}

const mapStateToProps = (state, props) => ({
    isAdvancedSearch: isAdvancedSearch(state)
});

const mapDispatchToProps = {
    initCheckQuerySearch,
    changePaginationNumber
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GgsProductsHeaderContainer));