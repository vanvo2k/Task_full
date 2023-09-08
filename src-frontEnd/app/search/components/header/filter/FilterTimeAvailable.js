import React, {Component} from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import FilterTimeAvailableEditor from "./FilterTimeAvailableEditor";
import {withRouter} from "react-router-dom";
import moment from "moment";
import parsePastTime from "../../../../../helpers/time/parsePastTime";
import {changeQuerySearch, parseSearchQuery} from "../../../../../helpers/RouterHelper";

class FilterTimeAvailable extends Component {
    componentDidUpdate() {
        this._syncQuery();
    }

    _syncQuery() {
        const {data, history} = this.props;

        const parsed = parseSearchQuery(history);
        const current = data.get('current');
        const {from, to} = current.toJS();

        const query = {};

        if (from !== parsed.fromA) {
            query.fromA = from;
        }

        if (to !== parsed.toA) {
            query.toA = to;
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
        const {className, data, type} = this.props;

        if (type === 'popsockets') {
            return null;
        }

        const isOpen = data.get('isOpen');
        const temp = data.get('temp');
        const current = data.get('current');
        const isActive = this.isActive();

        return (
            <div className={classNames("FilterTimeAvailable", className, {isActive})}>
                <div
                    onClick={this.props.openEditFilterTimeAvailable.bind(this)}
                    className="Content"
                    id="FilterTimeAvailable">
                    <i className="linear-calendar-empty"/>
                    {this._renderPreview(current)}
                </div>

                <FilterTimeAvailableEditor
                    current={temp}
                    onSubmit={this._handleSubmit.bind(this)}
                    onChange={this.props.changeTempFilterTimeAvailable.bind(this)}
                    toggle={this.props.toggleEditFilterTimeAvailable.bind(this)}
                    isOpen={isOpen}/>
            </div>
        );
    }

    _handleSubmit(args) {
        const {submitFilterTimeAvailable, triggerSearch} = this.props;

        submitFilterTimeAvailable(args)
            .then(() => {
                triggerSearch();
            });
    }

    _renderPreview(current) {
        const {from, to} = current.toJS();

        const fromPastTime = parsePastTime(from);
        const toPastTime = parsePastTime(to);

        const fromMoment = moment(from, 'DD-MM-YYYY');
        const toMoment = moment(to, 'DD-MM-YYYY');

        const fromMomentValidated = fromPastTime ? fromPastTime : fromMoment;
        const toMomentValidated = toPastTime ? toPastTime : toMoment;

        const fromText = fromMomentValidated.isValid() ? fromMomentValidated.format("MMM DD") : "Past";
        const toText = toMomentValidated.isValid() ? toMomentValidated.format("MMM DD") : "Today";

        let textRange = `${fromText} - ${toText}`;

        if (!from && !to) {
            textRange = 'Created Time';
        }

        return (
            <span>{textRange}</span>
        );
    }
}

FilterTimeAvailable.propsTypes = {
    type: PropTypes.string.isRequired,
    data: PropTypes.object,
    triggerSearch: PropTypes.func.isRequired,
    openEditFilterTimeAvailable: PropTypes.func,
    toggleEditFilterTimeAvailable: PropTypes.func,
    submitFilterTimeAvailable: PropTypes.func,
    changeTempFilterTimeAvailable: PropTypes.func,
};

export default withRouter(FilterTimeAvailable);