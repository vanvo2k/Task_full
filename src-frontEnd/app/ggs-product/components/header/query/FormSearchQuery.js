import React, {Component} from "react";
import PropTypes from "prop-types";
import {injectIntl} from "react-intl";
import getMessageText from "../../../../../helpers/i18n/getMessageText";

class FormSearchQuery extends Component {
    state = {
        term: ''
    };

    _delaySearch = null;
    _timeDelay = 500;

    _handleChangeInput = (e) => {
        const {value} = e.target;

        this.setState({
            term: value
        });

        this._triggerSearch(value);
    };

    _triggerSearch(term) {
        if (this._delaySearch) {
            clearTimeout(this._delaySearch);
        }

        this._delaySearch = setTimeout(() => {
            this.props.onSearch((term + '').trim());
        }, this._timeDelay);
    }

    _getLanguageText(key, defaultValue = '') {
        return getMessageText(this.props.intl)(`searchItem.query.${key}`, defaultValue);
    }

    render() {
        const {term} = this.state;

        return (
            <div className="FormSearchQuery">
                <input
                    value={term}
                    onChange={this._handleChangeInput}
                    className="SearchName form-control"
                    placeholder={this._getLanguageText('search_placeholder')}
                    type="text"/>
            </div>
        );
    }
}

FormSearchQuery.propTypes = {
    intl: PropTypes.object.isRequired,
    onSearch: PropTypes.func.isRequired,
};

export default injectIntl(FormSearchQuery);