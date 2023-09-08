import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import moment from 'moment';
import {Button, Form, FormGroup, Popover, PopoverBody, PopoverHeader} from "reactstrap";
import {injectIntl, FormattedMessage} from "react-intl";
import {SingleDatePicker} from "react-dates";
import withViewport from "../../../../../shared-components/withViewport";

class FilterDateEditor extends Component {
    state = {
        date: moment(),
        focused: false,
        isInvalidInput: false,
        daysAgo: 1
    };

    _isActiveButton() {
        const {current} = this.props;
        const dateT = current.get('date');

        if (!dateT) {
            return true;
        }

        const today = moment();
        const oneYearAgo = today.subtract(1, 'y').format('DD-MM-YYYY')
        const date = moment.isMoment(dateT) ? dateT.format('DD-MM-YYYY') : dateT

        return date === oneYearAgo
    }

    _isOutsideRange = (date) => {
        const today = moment()
        const merchAvailable = moment('01-09-2015', 'DD-MM-YYYY');

        return !date.isBetween(merchAvailable, today) || date.isSame(today, 'day');
    }

    _handleChangeTimeAuto = () => {
        const today = moment();
        const oneYearAgo = today.subtract(1, 'y').format('DD-MM-YYYY');
        const data = {date: oneYearAgo};
        const isActive = this._isActiveButton();

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
            const today = moment();
            const daysAgo = today.subtract(days, 'd').format('DD-MM-YYYY');

            this.props.onChange({
                date: daysAgo
            });
        }
    };

    _handleClickInput = (e) => {
        e.preventDefault();

        const {daysAgo} = this.state;

        const days = daysAgo > 0 ? parseInt(daysAgo, 10) : 1;
        const today = moment();
        const daysBefore = today.subtract(days, 'd').format('DD-MM-YYYY');
        const data = {date: daysBefore};

        this.props.onChange(data);
    };

    _handleSubmitDaysAgo = (e) => {
        e.preventDefault();

        const {daysAgo} = this.state;

        const days = daysAgo > 0 ? parseInt(daysAgo, 10) : 1;
        const today = moment();
        const daysBefore = today.subtract(days, 'd').format('DD-MM-YYYY');
        const data = {date: daysBefore};

        const {onChange, onSubmit} = this.props;
        onChange(data).then(() => {
            onSubmit(data);
        });
    };

    render() {
        const {className, isOpen, current} = this.props;
        const {date} = current.toJS();
        const momentDate = moment(date, "DD-MM-YYYY");
        const dateValidated = momentDate.isValid() ? momentDate : null;
        const {isInvalidInput, daysAgo} = this.state

        return (
            <div className={classNames("FilterHistoricalDayEditor", className)}>
                <Popover isOpen={isOpen}
                         className={className}
                         placement="bottom"
                         toggle={this._handleToggle.bind(this)}
                         target="FilterHistoricalDay">
                    <PopoverHeader>
                        <FormattedMessage id="searchItem.header.historical_day"/>
                    </PopoverHeader>

                    <PopoverBody>
                        <div className="FormFilterHistoricalDay">
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
                                            active: this._isActiveButton()
                                        })}
                                        onClick={this._handleChangeTimeAuto.bind(this)}
                                    ><FormattedMessage id="general.one_year_ago_today"/></Button>
                                </div>
                            </div>

                            <div className="Custom">
                                <Form>
                                    <FormGroup>
                                        <SingleDatePicker
                                            displayFormat={"DD-MM-YYYY"}
                                            date={dateValidated}
                                            isOutsideRange={this._isOutsideRange}
                                            onDateChange={this._handleChangeDate}
                                            focused={this.state.focused}
                                            onFocusChange={({ focused }) => this.setState({ focused })}
                                            numberOfMonths={1}
                                            anchorDirection={"right"}
                                        />
                                    </FormGroup>
                                    {
                                        isInvalidInput && <div className="Error">Invalid input.</div>
                                    }
                                    <FormGroup>
                                        <Button
                                            onClick={this._handleChangeHistoricalDay.bind(this)}
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

    _handleChangeHistoricalDay(e) {
        e.preventDefault();

        this._submitFilterHistoricalDay();
    }

    _submitFilterHistoricalDay() {
        const {date} = this.props.current.toJS();

        if (date) {
            this.setState({
                isInvalidInput: false
            })

            this.props.onSubmit({date});
        }
        else this.setState({
            isInvalidInput: true
        })
    }

    _handleChangeDate = (date) => {
        this.props.onChange({
            date: moment.isMoment(date) ? date.format('DD-MM-YYYY') : date
        });
    }

    _handleToggle() {
        this.props.toggle();
    }
}

FilterDateEditor.propTypes = {
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    isOpen: PropTypes.bool,
    current: PropTypes.object,
    intl: PropTypes.object
};

export default withViewport(injectIntl(FilterDateEditor));