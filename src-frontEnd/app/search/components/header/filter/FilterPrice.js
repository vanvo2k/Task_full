import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import FilterPriceEditor from "./FilterPriceEditor";
import getMessageText from "../../../../../helpers/i18n/getMessageText";
import {injectIntl} from "react-intl";
import {changeQuerySearch, parseSearchQuery} from "../../../../../helpers/RouterHelper";

class FilterPrice extends Component {
    componentDidUpdate() {
        this._syncQuery();
    }

    _syncQuery() {
        const {data, history} = this.props;

        const parsed = parseSearchQuery(history);
        const current = data.get('current');
        const {from, to} = current.toJS();

        const query = {};

        if (from !== parsed.fromP) {
            query.fromP = from;
        }

        if (to !== parsed.toP) {
            query.toP = to;
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
        const {className, data, changeTempFilterPrice} = props;
        const current = data.get('current');
        const temp = data.get('temp');
        const isOpen = data.get('isOpen');
        const isActive = this.isActive();

        return (
            <div className={classNames("FilterPrice", className, {isActive})}>
                <a className="Content" id="FilterPrice"
                   tabIndex={1}
                   onClick={this._handleEditable.bind(this)}>
                    <span className="Icon">$</span>
                    {this._renderTextView(current)}
                </a>

                <FilterPriceEditor
                    onSubmit={this._handleSubmit.bind(this)}
                    currentRange={temp}
                    onChange={changeTempFilterPrice}
                    toggle={this._handleToggleEditor.bind(this)}
                    isOpen={isOpen}/>
            </div>
        );
    }

    _handleSubmit() {
        const {submitFilterPrice, triggerSearch} = this.props;
        submitFilterPrice()
            .then(() => {
                triggerSearch();
            });
    }

    _renderTextView(current) {
        const {from, to} = current.toJS();
        const titleText = getMessageText(this.props.intl)('searchItem.header.price');

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
        this.props.toggleEditFilterPrice();
    }

    _handleEditable(e) {
        e.preventDefault();

        this.props.openEditFilterPrice();
    }
}

FilterPrice.propTypes = {
    history: PropTypes.object,
    data: PropTypes.object,
    triggerSearch: PropTypes.func,
    openEditFilterPrice: PropTypes.func,
    toggleEditFilterPrice: PropTypes.func,
    changeTempFilterPrice: PropTypes.func,
    submitFilterPrice: PropTypes.func,
    intl: PropTypes.object,
};

export default injectIntl(FilterPrice);