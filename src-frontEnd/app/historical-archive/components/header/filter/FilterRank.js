import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import FilterRankEditor from "./FilterRankEditor";
import formatNumberText from "../../../../../helpers/common/formatNumberText";
import {changeQuerySearch, parseSearchQuery} from "../../../../../helpers/RouterHelper";

class FilterRank extends Component {
    componentDidUpdate() {
        this._syncQuery();
    }

    _syncQuery() {
        const {data, history} = this.props;

        const parsed = parseSearchQuery(history);
        const current = data.get('current');
        const {from, to} = current.toJS();

        const query = {};

        if (from !== parsed.from) {
            query.from = from;
        }

        if (to !== parsed.to) {
            query.to = to;
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

        return parseInt(from, 10) > 1 || to;
    }

    render() {
        const {props} = this;
        const {className, data, changeTempFilterRank} = props;
        const current = data.get('current');
        const temp = data.get('temp');
        const isOpen = data.get('isOpen');
        const isActive = this.isActive();

        return (
            <div className={classNames("FilterRank", className, {isActive})}>
                <a className="Content" id="FilterRank"
                   tabIndex={1}
                   onClick={this._handleEditable.bind(this)}>
                    <i className="linear-chart-bars"/>
                    {this._renderTextView(current)}
                </a>

                <FilterRankEditor
                    onSubmit={this._handleSubmit.bind(this)}
                    currentRange={temp}
                    onChange={changeTempFilterRank}
                    toggle={this._handleToggleEditor.bind(this)}
                    isOpen={isOpen}/>
            </div>
        );
    }

    _handleSubmit() {
        this.props.submitFilterRank()
            .then(() => {
                this.props.triggerSearch();
            });
    }

    _renderTextView(current) {
        const {from, to} = current.toJS();
        const fromText = (from === '') ? 1 : formatNumberText(from);

        if (to === '') {
            return fromText + '+';
        }

        const toText = formatNumberText(to);

        return (
            <span>
                {fromText} to {toText}
            </span>
        );
    }

    _handleToggleEditor() {
        this.props.toggleEditFilterRank();
    }

    _handleEditable(e) {
        e.preventDefault();

        this.props.openEditFilterRank();
    }
}

FilterRank.propTypes = {
    history: PropTypes.object,
    data: PropTypes.object,
    triggerSearch: PropTypes.func,
    openEditFilterRank: PropTypes.func,
    toggleEditFilterRank: PropTypes.func,
    changeTempFilterRank: PropTypes.func,
    submitFilterRank: PropTypes.func,
};

export default FilterRank;
