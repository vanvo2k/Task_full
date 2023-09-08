import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {getSearchExcludedKeywordQuery} from "../../../selectors";
import SearchExcludedKeyword from "./SearchExcludedKeyword";

class SearchExcludedKeywordContainer extends Component {
    render() {
        const {props} = this;

        return <SearchExcludedKeyword {...props}/>;
    }
}

SearchExcludedKeywordContainer.propTypes = {
    changeSearchItemsQuery: PropTypes.func.isRequired,
    triggerSearch: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
    excludedKeyword: getSearchExcludedKeywordQuery(state),
});

const mapDispatchToProps = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchExcludedKeywordContainer));