import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {Label} from "reactstrap";
import {injectIntl, FormattedMessage} from "react-intl";
import getMessageText from "../../../../../helpers/i18n/getMessageText";
import {changeQuerySearch, parseSearchQuery} from "../../../../../helpers/RouterHelper";

class SortControl extends Component {
    componentDidUpdate() {
        this._syncQuery();
    }

    _syncQuery() {
        const {data, history} = this.props;
        const field = data.get('field');

        const parsed = parseSearchQuery(history);
        if (field === parsed.sortByField) {
            return;
        }

        changeQuerySearch(history)({sortByField: field});
    }

    _getLanguageText(key, defaultValue = '') {
        return getMessageText(this.props.intl)(`searchItem.sort.${key}`, defaultValue);
    }

    _changeOption(option) {
        const {changeFieldNameSortBy, triggerSearch, data} = this.props;
        const field = data.get('field');

        if (field === option) {
            return;
        }

        changeFieldNameSortBy(option)
            .then(() => {
                triggerSearch();
            });
    }

    _handleClickChange(option, e) {
        e.preventDefault();
        this._changeOption(option);
    }

    _handleOnChange = (e) => {
        const {value} = e.target;
        this._changeOption(value);
    };

    _getOptions = () => {
        const {type} = this.props;

        const options = [
            {
                key: 'trends',
                text: this._getLanguageText('field.trends')
            },
            {
                key: 'rank',
                text: this._getLanguageText('field.rank')
            },
            {
                key: 'trending',
                text: this._getLanguageText('field.trending')
            },
            {
                key: 'available',
                text: this._getLanguageText('field.available')
            },
            {
                key: 'crawled',
                text: this._getLanguageText('field.crawled')
            },
            {
                key: 'relevance',
                text: this._getLanguageText('field.relevance')
            }
        ];

        if (type !== 'popsockets') {
            return options.filter(option => option.key !== 'crawled');
        }

        return options.filter(option => option.key !== 'available');
    };

    render() {
        const {className, data} = this.props;
        const field = data.get('field');
        const options = this._getOptions();

        return (
            <div className={classNames('SortControl', className)}>
                <Label className="label"><FormattedMessage id="searchItem.sort.title"/> :</Label>

                <ul className="Options ButtonOptions">
                    {
                        options.map((option) => {
                            return (
                                <li
                                    onClick={this._handleClickChange.bind(this, option.key)}
                                    className={classNames('Option', {active: field === option.key}, option.key)}
                                    key={option.key}>
                                    {option.text}
                                </li>
                            );
                        })
                    }
                </ul>

                <div className="Selects">
                    <select value={field} className="form-control" onChange={this._handleOnChange} name="sortBy">
                        {
                            options.map(option => {
                                return (
                                    <option
                                        key={option.key}
                                        value={option.key}>{option.text}</option>
                                );
                            })
                        }
                    </select>
                </div>
            </div>
        );
    }
}

SortControl.propTypes = {
    type: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    history: PropTypes.object,
    triggerSearch: PropTypes.func.isRequired,
    changeFieldNameSortBy: PropTypes.func.isRequired,
    intl: PropTypes.object

};

export default injectIntl(SortControl)