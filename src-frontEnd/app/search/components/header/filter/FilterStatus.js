import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import {Input} from "reactstrap";
import classNames from "classnames";
import {Tooltip} from 'react-tippy';
import {FormattedMessage} from "react-intl";
import {changeQuerySearch, parseSearchQuery} from "../../../../../helpers/RouterHelper";


class FilterStatus extends Component {
    componentDidUpdate() {
        this._syncQuery();
    }

    _syncQuery() {
        const {status, history} = this.props;

        const parsed = parseSearchQuery(history);
        if (status === parsed.status) {
            return;
        }

        changeQuerySearch(history)({status});
    }

    isActive() {
        const {status} = this.props;

        return status;
    }

    render() {
        const {status} = this.props;
        const isActive = this.isActive();

        return (
            <Fragment>
            <div className={classNames('FilterStatus', {isActive})}>
                <div className="SelectWrapper">
                    <Input className="selectStatus" value={status} onChange={this._handleChangeSelect.bind(this)}
                           type="select">
                        <option value="alive"><FormattedMessage
                            id="searchItem.header.alive"/></option>
                        <option value="dead"><FormattedMessage
                            id="searchItem.header.dead"/></option>
                        <option value="all"><FormattedMessage
                            id="searchItem.header.all"/>
                        </option>
                    </Input>
                </div>
            </div>
            <span className="icon mr-1">
                <Tooltip disabled={false} popperOptions={{modifiers: {preventOverflow: {enabled: true, padding: -200}}}} position="right" 
                        title={"Listing status"} arrow={true}>
                    {/* <i className="fas fa-exclamation-circle fa-sm"/> */}
                    <img className="icon-exclamation-img" src="/assets/icons/exclamation-circle.svg" alt="exclamation" />
                </Tooltip>
            </span>
        </Fragment>
        );
    }

    _handleChangeSelect(e) {
        const status = e.target.value;
        const {changeSelectStatusItem, triggerSearch} = this.props;

        changeSelectStatusItem(status)
            .then(() => {
                triggerSearch();
            });
    }
}

FilterStatus.propTypes = {
    status: PropTypes.string,
    history: PropTypes.object,
    triggerSearch: PropTypes.func.isRequired,
    changeSelectStatusItem: PropTypes.func.isRequired,
};

export default FilterStatus;