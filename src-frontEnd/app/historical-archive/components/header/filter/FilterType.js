import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {Input} from "reactstrap";
import {injectIntl, defineMessages} from "react-intl";
import {changeQuerySearch, parseSearchQuery} from "../../../../../helpers/RouterHelper";

class FilterType extends Component {
    componentDidUpdate() {
        this._syncQuery();
    }

    _syncQuery() {
        const {type, history} = this.props;

        const parsed = parseSearchQuery(history);
        if (type === parsed.type) {
            return;
        }

        changeQuerySearch(history)({type});
    }

    _getTypeText(key) {
        const {intl} = this.props;

        const messages = defineMessages({
            type: {
                id: `searchItem.filter.type.${key}`
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
        const {type} = this.props;
        return type && type !== 'all';
    }

    render() {
        const {type} = this.props;
        const isActive = this.isActive();

        return (
            <div className={classNames('FilterType', {isActive})}>
                <i className="linear-shirt"/>
                <div className="SelectWrapper">
                    <Input
                        value={type}
                        onChange={this._handleOnChangeSelect.bind(this)}
                        type="select">
                        <optgroup label="Clothing">
                            {this._renderOption('all')}
                            {this._renderOption('standard')}
                            {this._renderOption('premium')}
                            {this._renderOption('longsleeve')}
                            {this._renderOption('hoodie')}
                            {this._renderOption('sweatshirt')}
                        </optgroup>
                    </Input>
                </div>
            </div>
        );
    }

    _handleOnChangeSelect(e) {
        const {value} = e.target;

        const {changeSelectTypeItem, triggerSearch} = this.props;
        changeSelectTypeItem(value)
            .then(() => {
                triggerSearch && triggerSearch();
            });
    }
}

FilterType.defaultProps = {
    type: 'all'
};

FilterType.propTypes = {
    type: PropTypes.string,
    intl: PropTypes.object,
    history: PropTypes.object,
    changeSelectTypeItem: PropTypes.func.isRequired,
    triggerSearch: PropTypes.func.isRequired,
};

export default injectIntl(FilterType);