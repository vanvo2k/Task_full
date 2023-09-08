import React, {Component} from "react";
import {connect} from "react-redux";
import {getTotalItems, getTotalSearchItems} from "../../selectors";
import SearchResult from "./SearchResult";

class SearchResultContainer extends Component {
    render() {
        const {props} = this;

        return <SearchResult {...props} />
    }
}

const mapStateToProps = (state, props) => ({
    totalItems: getTotalItems(state),
    totalSearchItems: getTotalSearchItems(state)
});

export default connect(mapStateToProps)(SearchResultContainer);