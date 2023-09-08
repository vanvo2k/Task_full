import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import timeHuman from "../../../helpers/time/timeHuman";
import timeLeft from "../../../helpers/time/timeLeft";

class EventDetails extends Component {
    render() {
        const {event, className} = this.props;
        const {area, description, name, type, time} = event;

        const timeHu = timeHuman(time, 'DD/MM/YYYY');

        return (
            <div className={classNames("EventDetails", className)}>
                <div onClick={this.props.onCloseDetail} className="Close">×</div>

                <div className="Body">
                    <div className="Name">{name}</div>

                    <div className="Meta">
                        <div title={timeHu} className="TimeLeft">
                            <span className="Icon"><i className="linear-calendar-empty"/></span>
                            <span className="Time">{timeHu} ({timeLeft(time)})</span>
                        </div>

                        <span className="Area"><i className="Icon linear-map-marker"/>{area}</span>
                        <div className="Type"><i className="Icon linear-list"/>{type}
                        </div>
                    </div>
                    <div className="Description">{description}</div>
                </div>
            </div>
        );
    }
}

EventDetails.propTypes = {
    className: PropTypes.string,
    event: PropTypes.object,
    onCloseDetail: PropTypes.func.isRequired,
};

export default EventDetails;