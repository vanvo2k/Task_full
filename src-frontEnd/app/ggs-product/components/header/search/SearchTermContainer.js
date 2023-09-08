import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getSearchTermQuery} from "../../../selectors";
import SearchTerm from "./SearchTerm";
import {withRouter} from "react-router-dom";

class SearchTermContainer extends Component {
    shouldComponentUpdate(nextProps) {
        return this.props.term !== nextProps.term;
    }

    render() {
        const {props} = this;

        return <SearchTerm {...props}/>;
    }
}

SearchTermContainer.propTypes = {
    changeSearchItemsQuery: PropTypes.func.isRequired,
    triggerSearch: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
    term: getSearchTermQuery(state),
});

const mapDispatchToProps = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchTermContainer));