import React, {Component} from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import FilterDateEditor from "./FilterDateEditor";
import {withRouter} from "react-router-dom";
import moment from "moment";
import {changeQuerySearch, parseSearchQuery} from "../../../../../helpers/RouterHelper";

class FilterDate extends Component {
    componentDidUpdate() {
        this._syncQuery();
    }

    _syncQuery() {
        const {data, history} = this.props;

         const parsed = parseSearchQuery(history);
         const current = data.get('current');
         const {date} = current.toJS();

         const query = {};

         if (date !== parsed.date) {
             query.date = date
         }

         if (!Object.keys(query).length) {
             return;
         }

         changeQuerySearch(history)(query);
    }

    isActive() {
        const {data} = this.props;
        const current = data.get('current');
        const {date} = current.toJS();

        return date || null
    }

    render() {
        const {className, data, type} = this.props;

        if (type === 'popsockets') {
            return null
        }

        const isOpen = data.get('isOpen');
        const temp = data.get('temp');
        const current = data.get('current');
        const isActive = this.isActive();

        return (
            <div className={classNames("FilterHistoricalDay", className, {isActive})}>
                <div
                    onClick={this.props.openEditFilterHistoricalDay.bind(this)}
                    className="Content"
                    id="FilterHistoricalDay">
                    <i className="linear-calendar-empty"/>
                    {this._renderPreview(current)}
                </div>
                <FilterDateEditor
                    current={temp}
                    onSubmit={this._handleSubmit.bind(this)}
                    onChange={this.props.changeTempFilterHistoricalDay.bind(this)}
                    toggle={this.props.toggleEditFilterHistoricalDay.bind(this)}
                    isOpen={isOpen}/>
            </div>
        );
    }

    _handleSubmit(args) {
        const {submitFilterHistoricalDay, triggerSearch} = this.props;

        submitFilterHistoricalDay(args)
            .then(() => {
                triggerSearch();
            });
    }

    _renderPreview(current) {
        const {date} = current.toJS();

        const dateMoment = moment(date, 'DD-MM-YYYY');
        const dateText = dateMoment.isValid() ? dateMoment.format("MMM DD, YYYY") : "Yesterday";

        let textDate = dateText
        if (!date) {
            textDate = 'Date';
        }

        return (
            <span>{textDate}</span>
        )
    }
}

FilterDate.propsType = {
    type: PropTypes.string.isRequired,
    data: PropTypes.object,
    triggerSearch: PropTypes.func.isRequired,
    openEditFilterHistoricalDay: PropTypes.func,
    toggleEditFilterHistoricalDay: PropTypes.func,
    submitFilterHistoricalDay: PropTypes.func,
    changeTempFilterHistoricalDay: PropTypes.func
};

export default withRouter(FilterDate);