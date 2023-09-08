import React, {Component} from "react";
import PropTypes from "prop-types";
import {Input} from "reactstrap";
import classNames from "classnames";
import {changeQuerySearch, parseSearchQuery} from "../../../../../helpers/RouterHelper";

class FilterBrandType extends Component {
    componentDidUpdate() {
        this._syncQuery();
    }

    _syncQuery() {
        const {type, history} = this.props;

        const parsed = parseSearchQuery(history);
        if (type === parsed.brandType) {
            return;
        }

        changeQuerySearch(history)({brandType: type});
    }

    _handleChangeType = (e) => {
        const {value} = e.target;

        const {triggerSearch, changeSelectBrandTypeItem} = this.props;
        changeSelectBrandTypeItem(value)
            .then(() => {
                triggerSearch();
            });
    };

    isActive() {
        const {type} = this.props;

        return type && type !== 'all';
    }

    render() {
        const {type} = this.props;
        const isActive = this.isActive();

        return (
            <div className={classNames("FilterBrandType", {isActive})}>
                <div className="SelectWrapper">
                    <Input className="selectBrandType"
                           onChange={this._handleChangeType}
                           value={type}
                           type="select">
                        <option value="official">Official</option>
                        <option value="unofficial">Unofficial</option>
                        <option value="all">All Brands</option>
                    </Input>
                </div>
            </div>
        );
    }
}

FilterBrandType.propTypes = {
    type: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
    triggerSearch: PropTypes.func.isRequired,
    changeSelectBrandTypeItem: PropTypes.func.isRequired,
};

export default FilterBrandType;