import React, {Component} from "react";
import PropTypes from "prop-types";
import {_getAllEvents} from "../../../services/EventServices";
import DocTitle from "../../../shared-components/DocTitle";
import {FormattedMessage} from "react-intl";
import CanUseFeatureContainer from "../../../shared-containers/CanUseFeatureContainer";
import EventTour from "./EventTour"
import { Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {actionOpenEventDetail} from "../actions"

class EventsCalendar extends Component {

    _handleClickDetail = (event) => {
        actionOpenEventDetail(event);
    }

    render() {
        const {events} = this.props;

        const dataCalendar = [];
        events.map(event => {
            const objEvent = {
                'id': event._id,
                'title': event.name,
                'desc': event.description,
                'start': new Date(event.time),
                'end': new Date(event.time),
                'area': event.area,
                'thumbnail': event.thumbnail,
                'type': event.type,
                'query': event.query
            }
            dataCalendar.push(objEvent)
        })

        const localizer = momentLocalizer(moment)

        return (
            <div className="Main">
                <Calendar
                    localizer={localizer}
                    events={dataCalendar}
                    startAccessor="start"
                    endAccessor="end"
                    views={['month']}
                    style={{ height: 700 }}
                    onSelectEvent={this._handleClickDetail}
                />
            </div>
        );
    }
}

export default EventsCalendar;