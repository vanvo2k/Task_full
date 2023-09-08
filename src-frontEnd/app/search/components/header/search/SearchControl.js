import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import SearchTermContainer from "./SearchTermContainer";
import SearchExcludedKeywordContainer from "./SearchExcludedKeywordContainer";
import SearchTypeContainer from "./SearchTypeContainer";

class SearchControl extends Component {
    _delaySearch = 0;

    render() {
        const {className, changeSearchItemsQuery} = this.props;

        return (
            <div className={classNames('SearchControl', className)}>
                <SearchTypeContainer changeSearchItemsQuery={changeSearchItemsQuery}
                                     triggerSearch={this._triggerSearch.bind(this)}/>

                <SearchTermContainer
                    changeSearchItemsQuery={changeSearchItemsQuery}
                    triggerSearch={this._triggerSearch.bind(this)}/>

                <SearchExcludedKeywordContainer
                    changeSearchItemsQuery={changeSearchItemsQuery}
                    triggerSearch={this._triggerSearch.bind(this)}/>
            </div>
        );
    }

    _triggerSearch() {
        if (this._delaySearch) {
            clearTimeout(this._delaySearch);
        }

        const timeDelaySearch = 500;
        this._delaySearch = setTimeout(() => {
            this.props.triggerSearch();
        }, timeDelaySearch);
    }
}

SearchControl.propTypes = {
    triggerSearch: PropTypes.func.isRequired,
    changeSearchItemsQuery: PropTypes.func.isRequired
};

export default SearchControl;