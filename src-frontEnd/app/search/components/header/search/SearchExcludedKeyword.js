import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {changeQuerySearch, parseSearchQuery} from "../../../../../helpers/RouterHelper";
import {injectIntl} from "react-intl";
import getMessageText from "../../../../../helpers/i18n/getMessageText";
import {MAX_LENGTH_SEARCH_TERM} from "../../../../../constants/CommonConstants";

class SearchExcludedKeyword extends Component {
    state = {
        isOpen: false,
    };

    textInput = null;

    _getLanguageText(key) {
        return getMessageText(this.props.intl)(key);
    }

    componentDidUpdate() {
        const {isOpen} = this.state;

        if (isOpen && this.textInput) {
            this.textInput.focus();
        }

        this._syncQuery();
    }

    _syncQuery() {
        const {excludedKeyword, history} = this.props;

        const parsed = parseSearchQuery(history);
        if (excludedKeyword === parsed.excludedKeyword) {
            return;
        }

        changeQuerySearch(history)({excludedKeyword});
    }

    render() {
        const {isOpen} = this.state;
        const {excludedKeyword, className} = this.props;

        return (
            <div className={classNames("SearchExcludedKeyword", className, {isOpen: isOpen || !!excludedKeyword})}>
                <input
                    className="Input form-control"
                    onChange={this._handleOnChangeExcludedKeyword.bind(this)}
                    onBlur={this._handleBlur.bind(this)}
                    type="text"
                    data-lpignore="true"
                    name="excluded-word"
                    id="excluded-word"
                    value={excludedKeyword}
                    ref={(input) => {
                        this.textInput = input;
                    }}
                    placeholder={this._getLanguageText('general.excluded_keywords')}
                    maxLength={MAX_LENGTH_SEARCH_TERM}
                />

                <button onClick={this._handleOpen.bind(this)} className="Toggle">
                    <i className="ion-android-search"/>
                </button>

                <span onClick={this._handleRemove.bind(this)} className={!!excludedKeyword ? 'Remove' : ''}/>
            </div>
        );
    }

    _handleBlur() {
        const {excludedKeyword} = this.props;

        if (!excludedKeyword) {
            this.setState({
                isOpen: false
            });
        }
    }

    _handleOpen(e) {
        e.preventDefault();

        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    _handleRemove(e) {
        e.preventDefault();

        this._changeExcludedKeyword('');
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    _handleOnChangeExcludedKeyword(e) {
        const excludedKeyword = e.target.value || '';
        this._changeExcludedKeyword(excludedKeyword);
    }

    _changeExcludedKeyword(excludedKeyword) {
        const {changeSearchItemsQuery, triggerSearch} = this.props;
        const query = {excludedKeyword};

        return changeSearchItemsQuery(query)
            .then(() => {
                return triggerSearch();
            });
    }

}

SearchExcludedKeyword.propTypes = {
    excludedKeyword: PropTypes.string,
    history: PropTypes.object,
    changeSearchItemsQuery: PropTypes.func.isRequired,
    triggerSearch: PropTypes.func.isRequired,
    intl: PropTypes.object,
};

export default injectIntl(SearchExcludedKeyword);