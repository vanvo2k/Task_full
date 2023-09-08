import React, {Component} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import timeLeft from "../../../helpers/time/timeLeft";
import timeHuman from "../../../helpers/time/timeHuman";
import {FormattedMessage} from "react-intl";
import {UncontrolledTooltip} from "reactstrap";

class EventActions extends Component {
    _handleClickShowDetails = (e) => {
        e.preventDefault();

        this.props.onShowDetail();
    };

    render() {
        const {event} = this.props;
        const {query, time, area} = event;

        const {keyword} = query;
        const link = `/a/items/?page=1&sortByField=rank&term=${keyword}&status=all&searchType=at_least_one`;

        return (
            <div className="EventActions d-flex justify-content-between align-items-center">
                <div id={`TimePublished-${event._id}`} title={timeHuman(time, 'DD/MM/YYYY')} className="TimeLeft">
                    <span className="Icon">
                        <i className="linear-calendar-31"/>
                    </span>
                    <span className="Time">
                        {timeLeft(time)}
                    </span>

                    <UncontrolledTooltip delay={300} placement="left" target={`#TimePublished-${event._id}`}>
                        {timeHuman(time, 'DD/MM/YYYY')}
                    </UncontrolledTooltip>
                </div>

                <div className="Area">
                    <span className="Icon">
                        <i className="linear-map-marker"/>
                    </span>
                    <span className="Label">{area}</span>
                </div>

                <div onClick={this._handleClickShowDetails} className="ShowDetails">
                    <FormattedMessage id="event.details"/>
                </div>

                <div className="ViewMoreProducts">
                    <Link to={link} className="btn btn-link"><FormattedMessage id="event.more_products"/></Link>
                </div>
            </div>
        );
    }
}

EventActions.propTypes = {
    event: PropTypes.object,
    onShowDetail: PropTypes.func.isRequired
};

export default EventActions;