import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {changeQuerySearch, parseSearchQuery} from "../../../../../helpers/RouterHelper";
import {Input} from "reactstrap";
import {FormattedMessage} from "react-intl";

class SearchType extends Component {
    componentDidUpdate() {
        this._syncQuery();
    }

    _syncQuery() {
        const {searchType, history} = this.props;

        const parsed = parseSearchQuery(history);
        if (searchType === parsed.searchType) {
            return;
        }

        changeQuerySearch(history)({searchType});
    }

    render() {
        const {searchType, className} = this.props;

        return (
            <div className="SelectWrapper">
                <Input
                    className={classNames("SearchType", className)}
                    onChange={this._handleOnChangeSearchType.bind(this)}
                    type="select"
                    name="search-type"
                    id="search-type"
                    value={searchType}>
                    <option value="all_words"><FormattedMessage id="searchItem.search.type.all_words"/></option>
                    <option value="at_least_one"><FormattedMessage id="searchItem.search.type.at_least_one"/></option>
                    <option value="same_order"><FormattedMessage id="searchItem.search.type.same_order"/></option>
                    <option value="match_phrase"><FormattedMessage id="searchItem.search.type.match_phrase"/></option>
                </Input>
            </div>
        );
    }

    _handleOnChangeSearchType(e) {
        const searchType = e.target.value || '';
        const {changeSearchItemsQuery, triggerSearch} = this.props;
        const query = {searchType};

        return changeSearchItemsQuery(query)
            .then(() => {
                return triggerSearch();
            });
    }
}

SearchType.propTypes = {
    searchType: PropTypes.string,
    history: PropTypes.object,
    changeSearchItemsQuery: PropTypes.func.isRequired,
    triggerSearch: PropTypes.func.isRequired,
};

export default SearchType;