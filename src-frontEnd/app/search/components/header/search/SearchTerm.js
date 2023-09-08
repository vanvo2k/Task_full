import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {changeQuerySearch, parseSearchQuery} from "../../../../../helpers/RouterHelper";
import {injectIntl} from "react-intl";
import getMessageText from "../../../../../helpers/i18n/getMessageText";
import {MAX_LENGTH_SEARCH_TERM} from "../../../../../constants/CommonConstants";
import {_getRecentSearches} from "../../../../../services/SearchHistoryServices";
import {DropdownMenu, DropdownToggle, DropdownItem, Dropdown} from "reactstrap"
import {Link} from "react-router-dom";

class SearchTerm extends Component {
    state = {
        histories: [],
        isRecentSearchOpen: false,
        newTerm:""
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this._handleKeyUp);
    }

    componentDidMount() {
        document.addEventListener('keydown', this._handleKeyUp);
        this._fetchRecentSearches()
        const searchTerm =parseSearchQuery()

        this.setState({newTerm:searchTerm.term})
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

    _fetchRecentSearches = () => {
        return _getRecentSearches()
            .then(response => {
                const {success, data} = response;

                if (success) {
                    this.setState({
                        histories: data
                    })
                }
            })
    }

    _toggleRecentSearch = () => {
        this.setState(({isRecentSearchOpen}) => ({
            isRecentSearchOpen: !isRecentSearchOpen
        }))
    }

    _handleSelectHistory = (e) => {
        e.preventDefault()
        const value = e.target.innerText
        const id = e.target.id

        const {histories} = this.state
        const searchType = histories[id].type || ''

        this._changeTerm(value, searchType)
    }

    render() {
        const {term, className} = this.props;
        const {histories, isRecentSearchOpen,newTerm} = this.state
        return (
            <div className={classNames("SearchTerm", className, {hasWord: !!term})}>
                <Dropdown isOpen={isRecentSearchOpen} toggle={this._toggleRecentSearch}>
                    <DropdownToggle className="RecentSearch">
                        <input
                            data-lpignore="true"
                            className="form-control"
                            onChange={this._handleOnChangeSearch.bind(this)}
                            ref="inputTerm"
                            type="text"
                            name="search-term"
                            id="search-term"
                            value={newTerm}
                            placeholder={this._getLanguageText('searchItem.search.search_placeholder')}
                            maxLength={MAX_LENGTH_SEARCH_TERM}
                            autoComplete="off"
                        />

                        <i className="ion-android-search IconSearch"/>
                        <span onClick={this._handleRemoveTerm.bind(this)} className={!!term ? 'Remove' : ''}/>
                    </DropdownToggle>
                    <DropdownMenu>
                        {
                            !!histories ?
                                (
                                    <Fragment>
                                        {
                                            histories.map((query, index) => {
                                                const {keyword} = query

                                                return <DropdownItem key={index} id={index}
                                                                     onClick={this._handleSelectHistory.bind(this)}>{keyword}</DropdownItem>
                                            })
                                        }
                                        <Link to="/a/search"><DropdownItem>See more</DropdownItem></Link>
                                    </Fragment>
                                ) : <DropdownItem disabled>No history.</DropdownItem>
                        }
                    </DropdownMenu>
                </Dropdown>
            </div>
        );
    }

    _handleRemoveTerm(e) {
        e.preventDefault();
        this.setState({newTerm:""});
        this._changeTerm('');
    }
    _delay=null
    _handleOnChangeSearch(e) {
        const term = e.target.value || '';
        
        this.setState({
            isRecentSearchOpen: false,
            newTerm:term
        })
        this._delay && clearTimeout(this._delay);
        this._delay = setTimeout(() => {
            this._changeTerm(term);
        }, 1000);
       
    }

    _changeTerm(term, searchType = '') {
        const {changeSearchItemsQuery, triggerSearch} = this.props;
        const query = searchType ? {searchType, term} : {term};

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