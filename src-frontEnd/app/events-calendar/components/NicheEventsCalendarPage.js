import React, {Component} from "react";
import {connect} from "react-redux"
import {_getAllEvents} from "../../../services/EventServices";
import DocTitle from "../../../shared-components/DocTitle";
import {FormattedMessage} from "react-intl";
import CanUseFeatureContainer from "../../../shared-containers/CanUseFeatureContainer";
import EventTour from "./EventTour"
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {actionOpenEventDetail} from "../actions"
import EventItemModalContainer from "./EventItemModalContainer";

class NicheEventsCalendarPage extends Component {
    state = {
        events: [],
        back: true,
        next: true,
        limitBack: new Date(new Date().getFullYear(), 0, 1),
        limitNext: new Date(new Date().getFullYear() + 1, 11, 1)
    };

    componentDidMount() {
        this._fetchListEvent();
        this._handleLimitDate();
    }

    _handleLimitDate = () => {
        let currentDate = new Date();

        if (currentDate.getMonth() <= 5) {
            this.setState({
                limitBack: new Date(currentDate.getFullYear() - 1, 0, 1),
                limitNext: new Date(currentDate.getFullYear(), 11, 1)
            })
        } else {
            this.setState({
                limitBack: new Date(new Date().getFullYear(), 0, 1),
                limitNext: new Date(new Date().getFullYear() + 1, 11, 1)
            })
        }
    }

    _fetchListEvent = () => {
        _getAllEvents()
            .then(result => {
                const {success, data} = result;

                if (success) {
                    this.setState({
                        events: data
                    });
                }
            });
    };

    _handleClickDetail = (event) => {
        this.props.actionOpenEventDetail(event)
    }

    _customToolbar = (toolbar) => {

        const goToBack = () => {
            let mDate = toolbar.date;
            let {limitBack, limitNext} = this.state;

            let newDate = new Date(
                mDate.getFullYear(),
                mDate.getMonth() - 1,
                1);
            toolbar.onNavigate('prev', newDate);

            if (newDate.getTime() === limitBack.getTime()) {
                this.setState({
                    back: false
                })
            }

            let nextDate = new Date(mDate.getFullYear(), mDate.getMonth(), 1)
            if (nextDate.getTime() === limitNext.getTime()) {
                this.setState({
                    next: true
                })
            }
        };

        const goToNext = () => {
            let mDate = toolbar.date;
            let {limitNext, limitBack} = this.state;

            let newDate = new Date(
                mDate.getFullYear(),
                mDate.getMonth() + 1,
                1);
            toolbar.onNavigate('next', newDate);

            if (newDate.getTime() === limitNext.getTime()) {
                this.setState({
                    next: false
                })
            }

            let prevDate = new Date(mDate.getFullYear(), mDate.getMonth(), 1)
            if (prevDate.getTime() === limitBack.getTime()) {
                this.setState({
                    back: true
                })
            }
        };

        const goToCurrent = () => {
            const now = new Date();
            toolbar.date.setMonth(now.getMonth());
            toolbar.date.setFullYear(now.getFullYear());
            toolbar.onNavigate('current');

            this.setState({
                next: true,
                back: true
            })
        };

        const label = () => {
            const date = moment(toolbar.date);
            return (
                <span><b>{date.format('MMMM')}</b><span> {date.format('YYYY')}</span></span>
            );
        };

        const {next, back} = this.state;

        return (
            <div className='calendar-toolbar'>
                <div className='calendar-toolbar-date'>{label()}</div>

                <div className='calendar-toolbar-buttons'>
                    <button className='btn-back' onClick={goToBack} disabled={!back}>&#8249;</button>
                    <button className='btn-current' onClick={goToCurrent}>today</button>
                    <button className='btn-next' onClick={goToNext} disabled={!next}>&#8250;</button>
                </div>
            </div>
        );
    };

    _eventStyleGetter = (event, start) => {
        const now = new Date();
        const currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())

        if (start.getTime() < currentDate.getTime()) {
            return {
                style: {
                    opacity: '0.5'
                }
            };
        }
    };

    render() {
        const {events} = this.state;
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
            <DocTitle title="Events">
                <CanUseFeatureContainer demoImage="events.jpg" feature={'getItems'} alternatively='all'>
                    <div className="NicheEventsPage">
                        <div className="container">
                            <EventTour/>
                            <h1 className="PageTitle"><FormattedMessage id="event.title"/></h1>

                            <div className="Main">
                                <Calendar
                                    localizer={localizer}
                                    events={dataCalendar}
                                    startAccessor="start"
                                    endAccessor="end"
                                    views={['month']}
                                    style={{height: 800}}
                                    components={{
                                        toolbar: this._customToolbar
                                    }}
                                    onSelectEvent={this._handleClickDetail}
                                    showAllEvents={true}
                                    eventPropGetter={(this._eventStyleGetter)}
                                />
                            </div>

                            <EventItemModalContainer/>
                        </div>
                    </div>
                </CanUseFeatureContainer>

            </DocTitle>
        );
    }
}

const mapDispatchToProps = {
    actionOpenEventDetail
}

export default connect(null, mapDispatchToProps)(NicheEventsCalendarPage)
