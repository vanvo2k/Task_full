import React, {Component} from "react";
import PropTypes from "prop-types";
import {Input} from "reactstrap";
import classNames from "classnames";
import {defineMessages, FormattedMessage} from "react-intl";
import {changeQuerySearch, parseSearchQuery} from "../../../../../helpers/RouterHelper";
import withAuthentication from "../../../../../shared-components/withAuthentication";
import {List} from "immutable";

class FilterMarket extends Component {
    componentDidUpdate() {
        this._syncQuery();
    }

    _syncQuery() {
        const {market, history} = this.props;

        const parsed = parseSearchQuery(history);
        if (market === parsed.market) {
            return;
        }

        changeQuerySearch(history)({market});
    }

    _getTypeText(key) {
        const {intl} = this.props;

        const messages = defineMessages({
            type: {
                id: `searchItem.filter.market.${key}`
            }
        });

        return intl.formatMessage(messages.type);
    }

    _renderOption(key) {
        return (
            <option value={key}>{this._getTypeText(key)}</option>
        );
    }

    isActive() {
        const {market} = this.props;

        return market;
    }

    _handleChangeSelect(e) {
        const {value} = e.target;

        const {changeSelectMarketItem, triggerSearch} = this.props;
        changeSelectMarketItem(value)
            .then(() => {
                triggerSearch && triggerSearch();
            });
    }

    render() {
        const {market} = this.props
        const isActive = this.isActive()

        return (
            <div className={classNames('FilterMarket', {isActive})}>
                <div className="SelectWrapper">
                    <Input className="selectMarket" value={market} onChange={this._handleChangeSelect.bind(this)}
                           type="select">
                        <option value="us"><FormattedMessage
                            id="searchItem.filter.market.us"/></option>
                        <option value="uk"><FormattedMessage
                            id="searchItem.filter.market.uk"/></option>
                        <option value="de"><FormattedMessage
                            id="searchItem.filter.market.de"/></option>
                    </Input>
                </div>
            </div>
        );
    }
}

FilterMarket.propTypes = {
    market: PropTypes.string,
    history: PropTypes.object,
    triggerSearch: PropTypes.func.isRequired,
    changeSelectMarketItem: PropTypes.func.isRequired,
};

export default FilterMarket;