import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {getSearchTypeQuery} from "../../../selectors";
import SearchType from "./SearchType";

class SearchTypeContainer extends Component {
    shouldComponentUpdate(nextProps) {
        return this.props.searchType !== nextProps.searchType;
    }

    render() {
        const {props} = this;

        return <SearchType {...props} />;
    }
}

SearchTypeContainer.propTypes = {
    changeSearchItemsQuery: PropTypes.func.isRequired,
    triggerSearch: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
    searchType: getSearchTypeQuery(state)
});

const mapDispatchToProps = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchTypeContainer));