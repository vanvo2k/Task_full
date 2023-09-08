import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import getMessageText from "../../../../../helpers/i18n/getMessageText";
import {injectIntl} from "react-intl";
import {changeQuerySearch, parseSearchQuery} from "../../../../../helpers/RouterHelper";
import FilterMinPriceEditor from "./FilterMinPriceEditor";

class FilterMinPrice extends Component {
    componentDidUpdate() {
        this._syncQuery();
    }

    _syncQuery() {
        const {data, history} = this.props;

        const parsed = parseSearchQuery(history);
        const current = data.get('current');
        const {from, to} = current.toJS();

        const query = {};

        if (from !== parsed.fromMinP) {
            query.fromMinP = from;
        }

        if (to !== parsed.toMinP) {
            query.toMinP = to;
        }

        if (!Object.keys(query).length) {
            return;
        }

        changeQuerySearch(history)(query);
    }

    isActive() {
        const {data} = this.props;
        const current = data.get('current');
        const {from, to} = current.toJS();

        return from || to;
    }

    render() {
        const {props} = this;
        const {className, data, changeTempFilterMinPrice} = props;
        const current = data.get('current');
        const temp = data.get('temp');
        const isOpen = data.get('isOpen');
        const isActive = this.isActive();

        return (
            <div className={classNames("FilterMinPrice", className, {isActive})}>
                <a className="Content" id="FilterMinPrice"
                   tabIndex={1}
                   onClick={this._handleEditable.bind(this)}>
                    <span className="Icon">$</span>
                    {this._renderTextView(current)}
                </a>

                <FilterMinPriceEditor
                    onSubmit={this._handleSubmit.bind(this)}
                    currentRange={temp}
                    onChange={changeTempFilterMinPrice}
                    toggle={this._handleToggleEditor.bind(this)}
                    isOpen={isOpen}/>
            </div>
        );
    }

    _handleSubmit() {
        const {submitFilterMinPrice, triggerSearch} = this.props;
        submitFilterMinPrice()
            .then(() => {
                triggerSearch();
            });
    }

    _renderTextView(current) {
        const {from, to} = current.toJS();
        const titleText = getMessageText(this.props.intl)('searchItem.header.min_price');

        if (!from && !to) {
            return titleText;
        }

        const fromText = !from ? 0 : `$${from}`;
        if (!to) {
            return fromText + '+';
        }
        const toText = `$${to}`;

        return (
            <span>
                {fromText} - {toText}
            </span>
        );
    }

    _handleToggleEditor() {
        this.props.toggleEditFilterMinPrice();
    }

    _handleEditable(e) {
        e.preventDefault();

        this.props.openEditFilterMinPrice();
    }
}

FilterMinPrice.propTypes = {
    history: PropTypes.object,
    data: PropTypes.object,
    triggerSearch: PropTypes.func,
    openEditFilterMinPrice: PropTypes.func,
    toggleEditFilterMinPrice: PropTypes.func,
    changeTempFilterMinPrice: PropTypes.func,
    submitFilterMinPrice: PropTypes.func,
    intl: PropTypes.object,
};

export default injectIntl(FilterMinPrice);