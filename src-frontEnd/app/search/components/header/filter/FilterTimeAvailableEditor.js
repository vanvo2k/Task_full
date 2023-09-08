import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import moment from 'moment';
import {Button, Form, FormGroup, Popover, PopoverBody, PopoverHeader} from "reactstrap";
import {injectIntl, FormattedMessage} from "react-intl";
import getMessageText from "../../../../../helpers/i18n/getMessageText";
import {DateRangePicker} from "react-dates";
import withViewport from "../../../../../shared-components/withViewport";
import parsePastTime from "../../../../../helpers/time/parsePastTime";


class FilterTimeAvailableEditor extends Component {
    state = {
        startDate: null,
        endDate: moment(),
        focusedInput: null,
        daysAgo: 1,
    };

    _isActiveButton({from, to}) {
        const {current} = this.props;
        const fromT = current.get('from');
        const toT = current.get('to');

        if (!from && !to && !fromT && !toT) {
            return true;
        }

        const fromPast = parsePastTime(fromT);
        const toPast = parsePastTime(toT);

        const fromValidated = fromPast ? fromPast : fromT;
        const toValidated = toPast ? toPast : toT;

        return (from === fromT || (moment.isMoment(fromValidated) && fromValidated.diff(moment(from), 'days') === 0))
            && (to === toT || (moment.isMoment(toValidated) && toValidated.diff(moment(to), 'days') === 0));
    }

    _getLanguageText(key) {
        return getMessageText(this.props.intl)(key);
    }

    _isOutsideRangeDate = (date) => {
        const tomorrow = moment().add(1, 'day');
        const merchAvailable = moment('01-09-2015', 'DD-MM-YYYY');

        return !date.isBetween(merchAvailable, tomorrow) || date.isSame(tomorrow, 'day');
    };

    _handleChangeTimeAuto = (time) => {
        const data = {from: time, to: null};
        const isActive = this._isActiveButton(data);

        if (isActive) {
            return;
        }

        const {onChange, onSubmit} = this.props;
        onChange(data).then(() => {
            onSubmit(data);
        });
    };

    _handleChangeDaysAgo = (e) => {
        const {value} = e.target;

        this.setState({
            daysAgo: value
        });

        if (value) {
            const days = value > 0 ? parseInt(value, 10) : 1;

            this.props.onChange({
                from: `${days}-day-ago`,
                to: null
            });
        }
    };

    _handleClickInput = (e) => {
        e.preventDefault();

        const {daysAgo} = this.state;

        this.props.onChange({
            from: `${daysAgo}-day-ago`,
            to: null
        });
    };

    _handleSubmitDaysAgo = (e) => {
        e.preventDefault();

        const {daysAgo} = this.state;
        const days = daysAgo > 0 ? parseInt(daysAgo, 10) : 1;
        const data = {from: `${days}-day-ago`, to: null};

        const {onChange, onSubmit} = this.props;
        onChange(data).then(() => {
            onSubmit(data);
        });
    };

    render() {
        const {className, isOpen, current, isMobile} = this.props;
        const {from, to} = current.toJS();

        const fromPastTime = parsePastTime(from);
        const toPastTime = parsePastTime(to);

        const momentFrom = moment(from, 'DD-MM-YYYY');
        const momentTo = moment(to, 'DD-MM-YYYY');

        const fromValidated = fromPastTime ? fromPastTime : (momentFrom.isValid() ? momentFrom : null);
        const toValidated = toPastTime ? toPastTime : (momentTo.isValid() ? momentTo : null);

        const {daysAgo} = this.state;

        return (
            <div className={classNames("FilterTimeAvailableEditor", className)}>
                <Popover isOpen={isOpen}
                         className={className}
                         placement="bottom"
                         toggle={this._handleToggle.bind(this)}
                         target="FilterTimeAvailable">
                    <PopoverHeader>
                        <FormattedMessage id="searchItem.header.time_available_is_between"/>
                    </PopoverHeader>

                    <PopoverBody>
                        <div className="FormFilterTimeAvailable">
                            <div className="Auto">
                                <div className="Options">
                                    <form onSubmit={this._handleSubmitDaysAgo} className="CustomAuto">
                                        <input
                                            min={1}
                                            onClick={this._handleClickInput}
                                            onChange={this._handleChangeDaysAgo}
                                            value={daysAgo} className="form-control" type="number"/>
                                        <span className="Unit"><FormattedMessage
                                            id="searchItem.header.days_ago"/></span>
                                    </form>

                                    <Button
                                        className={classNames({
                                            active: this._isActiveButton({
                                                from: '7-day-ago',
                                                to: null
                                            })
                                        })}
                                        onClick={this._handleChangeTimeAuto.bind(this, '7-day-ago')}
                                    ><FormattedMessage id="general.last_week"/></Button>
                                    <Button
                                        className={classNames({
                                            active: this._isActiveButton({
                                                from: '1-month-ago',
                                                to: null
                                            })
                                        })}
                                        onClick={this._handleChangeTimeAuto.bind(this, '1-month-ago')}
                                    ><FormattedMessage id="general.last_month"/></Button>

                                    <Button
                                        className={classNames({
                                            active: this._isActiveButton({
                                                from: null,
                                                to: null
                                            })
                                        })}
                                        onClick={this._handleChangeTimeAuto.bind(this, '')}
                                    ><FormattedMessage id="general.all"/></Button>
                                </div>
                            </div>

                            <div className="Custom">
                                <Form>
                                    <FormGroup>
                                        <DateRangePicker
                                            displayFormat={"DD/MM"}
                                            startDatePlaceholderText={this._getLanguageText('searchItem.header.from')}
                                            endDatePlaceholderText={this._getLanguageText('searchItem.header.to')}
                                            numberOfMonths={isMobile ? 1 : 2}
                                            enableOutsideDays
                                            isOutsideRange={this._isOutsideRangeDate}
                                            startDate={fromValidated}
                                            startDateId="filter.time.available.start"
                                            endDate={toValidated}
                                            endDateId="filter.time.available.end"
                                            onDatesChange={this._handleChangeDate}
                                            focusedInput={this.state.focusedInput}
                                            onFocusChange={focusedInput => this.setState({focusedInput})}
                                            minimumNights={0}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Button
                                            onClick={this._handleChangeTimeAvailable.bind(this)}
                                            color="primary" block>
                                            <FormattedMessage id="searchItem.header.save"/>
                                        </Button>
                                    </FormGroup>
                                </Form>
                            </div>
                        </div>
                    </PopoverBody>
                </Popover>
            </div>
        );
    }

    _handleChangeTimeAvailable(e) {
        e.preventDefault();

        this._submitFilterTimeAvailable();
    }

    _submitFilterTimeAvailable() {
        const {from, to} = this.props.current.toJS();

        this.props.onSubmit({from, to});
    }

    _handleChangeDate = ({startDate, endDate}) => {
        this.props.onChange({
            from: moment.isMoment(startDate) ? startDate.format('DD-MM-YYYY') : startDate,
            to: moment.isMoment(endDate) ? endDate.format('DD-MM-YYYY') : endDate
        });
    };

    _handleToggle() {
        this.props.toggle();
    }
}

FilterTimeAvailableEditor.propTypes = {
    isMobile: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    isOpen: PropTypes.bool,
    current: PropTypes.object,
    intl: PropTypes.object
};

export default withViewport(injectIntl(FilterTimeAvailableEditor));