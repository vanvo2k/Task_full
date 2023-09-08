import React, {Component} from "react";
import {Button, Form, FormGroup, Modal, ModalBody} from "reactstrap";
import {SingleDatePicker} from "react-dates";
import {FormattedMessage} from "react-intl";
import moment from "moment";
import classNames from "classnames";

class DateSelectionModal extends Component {
    state = {
        focused: false,
        date: moment().subtract(1, 'day'),
        daysAgo: 1,
    }

    _isActiveButton() {
        const {date} = this.state

        const today = moment();
        const oneYearAgo = today.subtract(1, 'y').format('DD-MM-YYYY')
        const formattedDate = moment.isMoment(date) ? date.format('DD-MM-YYYY') : date

        return formattedDate === oneYearAgo
    }

    _isOutsideRange = (date) => {
        const today = moment()
        const merchAvailable = moment('01-09-2015', 'DD-MM-YYYY');

        return !date.isBetween(merchAvailable, today) || date.isSame(today, 'day');
    }

    _handleChangeDate = (date) => {
        this.setState({
            date: moment.isMoment(date) ? date.format('DD-MM-YYYY') : date
        })
    }

    _handleChangeHistoricalDay = () => {
        const {date} = this.state;
        const {onSubmit} = this.props;

        onSubmit({date: moment.isMoment(date) ? date.format('DD-MM-YYYY') : date})
    }

    _handleChangeTimeAuto = () => {
        const today = moment();
        const oneYearAgo = today.subtract(1, 'y').format('DD-MM-YYYY');
        const data = {date: oneYearAgo};
        const isActive = this._isActiveButton();

        if (isActive) {
            return;
        }

        const {onSubmit} = this.props;
        onSubmit(data)
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

            this.setState({
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

        this.setState(data);
    };

    _handleSubmitDaysAgo = (e) => {
        e.preventDefault();

        const {daysAgo} = this.state;

        const days = daysAgo > 0 ? parseInt(daysAgo, 10) : 1;
        const today = moment();
        const daysBefore = today.subtract(days, 'd').format('DD-MM-YYYY');
        const data = {date: daysBefore};

        const {onSubmit} = this.props;
        this.setState(data)
            .then(() => {
            onSubmit(data);
        });
    };

    render() {
        const {isOpen, isInvalidDate} = this.props;
        const {date, daysAgo} = this.state
        const momentDate = moment(date, "DD-MM-YYYY");
        const dateValidated = momentDate.isValid() ? momentDate : null;

        return (
            <Modal
                isOpen={isOpen}
                size="sm"
                className="DateSelectionModal"
            >
                <ModalBody>
                    <div>
                        <div className="Title">Select a date:</div>
                        {
                            isInvalidDate && <div className="Error">Invalid date.</div>
                        }
                        <div className="FormFilterHistoricalDay FormFilterHistoricalDayModal">
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
                                            onFocusChange={({focused}) => this.setState({focused})}
                                            numberOfMonths={1}
                                            anchorDirection={"left"}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Button
                                            onClick={this._handleChangeHistoricalDay.bind(this)}
                                            color="primary">
                                            <FormattedMessage id="searchItem.header.save"/>
                                        </Button>
                                    </FormGroup>
                                </Form>
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        )
    }
}

export default DateSelectionModal