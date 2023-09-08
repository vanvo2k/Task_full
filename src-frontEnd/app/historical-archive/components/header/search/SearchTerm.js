import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {changeQuerySearch, parseSearchQuery} from "../../../../../helpers/RouterHelper";
import {injectIntl} from "react-intl";
import getMessageText from "../../../../../helpers/i18n/getMessageText";
import {MAX_LENGTH_SEARCH_TERM} from "../../../../../constants/CommonConstants";

class SearchTerm extends Component {
    componentWillUnmount() {
        document.removeEventListener('keydown', this._handleKeyUp);
    }

    componentDidMount() {
        document.addEventListener('keydown', this._handleKeyUp);
    }

    componentDidUpdate() {
        this._syncQuery();
    }

    _syncQuery() {
        const {term, history} = this.props;

        const parsed = parseSearchQuery(history);
        if (term === parsed.term) {
            return;
        }

        changeQuerySearch(history)({term});
    }

    _getLanguageText(key) {
        return getMessageText(this.props.intl)(key);
    }

    _handleKeyUp = (e) => {
        if (!e.metaKey) {
            return;
        }

        if (e.keyCode !== 75) {
            return;
        }

        const {inputTerm} = this.refs;
        if (inputTerm && typeof inputTerm.focus === 'function') {
            inputTerm.focus();

            if (typeof inputTerm.scrollIntoView === 'function') {
                inputTerm.scrollIntoView(false);
            }
        }
    };

    render() {
        const {term, className} = this.props;

        return (
            <div className={classNames("SearchTerm", className, {hasWord: !!term})}>
                <input
                    data-lpignore="true"
                    className="form-control"
                    onChange={this._handleOnChangeSearch.bind(this)}
                    ref="inputTerm"
                    type="text"
                    name="search-term"
                    id="search-term"
                    value={term}
                    placeholder={this._getLanguageText('searchItem.search.search_placeholder')}
                    maxLength={MAX_LENGTH_SEARCH_TERM}
                    autoComplete="off"
                />

                <i className="ion-android-search IconSearch"/>
                <span onClick={this._handleRemoveTerm.bind(this)} className={!!term ? 'Remove' : ''}/>
            </div>
        );
    }

    _handleRemoveTerm(e) {
        e.preventDefault();

        this._changeTerm('');
    }

    _handleOnChangeSearch(e) {
        const term = e.target.value || '';

        this._changeTerm(term);
    }

    _changeTerm(term) {
        const {changeSearchItemsQuery, triggerSearch} = this.props;
        const query = {term};

        return changeSearchItemsQuery(query)
            .then(() => {
                return triggerSearch();
            });
    }
}

SearchTerm.propTypes = {
    term: PropTypes.string,
    history: PropTypes.object,
    changeSearchItemsQuery: PropTypes.func.isRequired,
    triggerSearch: PropTypes.func.isRequired,
    intl: PropTypes.object
};

export default injectIntl(SearchTerm)