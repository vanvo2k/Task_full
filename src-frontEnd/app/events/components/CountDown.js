import React, {Component} from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import Moment from "moment";

class Countdown extends Component {
    _initState = {
        days: 0,
        hours: 0,
        min: 0,
        sec: 0,
    };

    constructor(props) {
        super(props);

        const date = this._calculateCountdown(this.props.date);
        this.state = date ? date : this._initState;
    }

    componentDidMount() {
        this._tick();
    }

    componentWillUnmount() {
        this._stop();
    }

    _calculateCountdown(endDate) {
        let diff = parseInt(Moment(endDate).diff(Moment()) / 1000, 10);

        // clear countdown when date is reached
        if (diff <= 0) return false;

        const timeLeft = {
            years: 0,
            days: 0,
            hours: 0,
            min: 0,
            sec: 0,
            millisec: 0,
        };

        // calculate time difference between now and expected date
        if (diff >= (365.25 * 86400)) { // 365.25 * 24 * 60 * 60
            timeLeft.years = Math.floor(diff / (365.25 * 86400));
            diff -= timeLeft.years * 365.25 * 86400;
        }
        if (diff >= 86400) { // 24 * 60 * 60
            timeLeft.days = Math.floor(diff / 86400);
            diff -= timeLeft.days * 86400;
        }
        if (diff >= 3600) { // 60 * 60
            timeLeft.hours = Math.floor(diff / 3600);
            diff -= timeLeft.hours * 3600;
        }
        if (diff >= 60) {
            timeLeft.min = Math.floor(diff / 60);
            diff -= timeLeft.min * 60;
        }
        timeLeft.sec = diff;

        return timeLeft;
    }

    _tick() {
        this.interval = setInterval(() => {
            const date = this._calculateCountdown(this.props.date);
            date ? this.setState(date) : this._stop();
        }, 1000);
    };

    _stop() {
        clearInterval(this.interval);
    }

    _addLeadingZeros(value) {
        value = String(value);
        while (value.length < 2) {
            value = '0' + value;
        }

        return value;
    }

    render() {
        const countDown = this.state;

        return (
            <div className={classNames("Countdown")}>
                <span className="countdown-column">
                  <span className="countdown-column-element">
                    <strong className="countdown-column-element-number">{this._addLeadingZeros(countDown.days)}</strong>
                    <span className="countdown-column-element-text">{countDown.days === 1 ? 'Day' : 'Days'}</span>
                  </span>
                </span>

                <span className="countdown-column">
                  <span className="countdown-column-element">
                    <strong
                        className="countdown-column-element-number">{this._addLeadingZeros(countDown.hours)}</strong>
                    <span className="countdown-column-element-text">{countDown.hours === 1 ? 'Hour' : 'Hours'}</span>
                  </span>
                </span>

                <span className="countdown-column">
                  <span className="countdown-column-element">
                    <strong className="countdown-column-element-number">{this._addLeadingZeros(countDown.min)}</strong>
                    <span className="countdown-column-element-text">Min</span>
                  </span>
                </span>

                <span className="countdown-column">
                  <span className="countdown-column-element">
                    <strong className="countdown-column-element-number">{this._addLeadingZeros(countDown.sec)}</strong>
                    <span className="countdown-column-element-text">Sec</span>
                  </span>
                </span>
            </div>
        );
    }
}

Countdown.propTypes = {
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    className: PropTypes.string,
};

Countdown.defaultProps = {
    date: new Date()
};

export default Countdown;