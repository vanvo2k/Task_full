import React, {Component} from "react";
import PropTypes from "prop-types";
import ListEvents from "./ListEvents";
import {_getListEvents} from "../../../services/EventServices";
import DocTitle from "../../../shared-components/DocTitle";
import Waypoint from 'react-waypoint';
import EventItemPlaceholder from "./EventItemPlaceholder";
import {FormattedMessage} from "react-intl";
import NoMoreEvent from "./NoMoreEvent";
import CanUseFeatureContainer from "../../../shared-containers/CanUseFeatureContainer";
import * as RealtimeServices from "../../../services/ws/RealtimeServices";
import EventTour from "./EventTour"

const EVENTS_PER_PAGE = 10;

class NicheEventsPage extends Component {
    state = {
        events: [],
        nextPage: 1,
        more: true
    };

    componentDidMount() {
        RealtimeServices.subscribe('events_changed', this._handleEventChanged);
    }

    componentWillUnmount() {
        RealtimeServices.unsubscribe('events_changed', this._handleEventChanged);
    }

    _fetchListEvent = () => {
        const {nextPage, more} = this.state;

        if (!more) {
            return;
        }

        _getListEvents({page: nextPage, limit: EVENTS_PER_PAGE})
            .then(result => {
                const {success, data} = result;

                if (success) {
                    this.setState(({events, nextPage}) => ({
                        events: [...events, ...data],
                        nextPage: nextPage + 1,
                        more: data.length >= EVENTS_PER_PAGE
                    }));
                }
            });
    };

    _handleEventChanged = ({eventId, updated}) => {
        this.setState(({events}) => ({
            events: events.map(event => {
                if (event._id !== eventId) {
                    return event;
                }

                return {
                    ...event,
                    ...updated
                };
            })
        }));
    };

    _handleViewMore = (e) => {
        this._fetchListEvent();
    };

    render() {
        const {events, more} = this.state;
        
        return (
            <DocTitle title="Events">
                <CanUseFeatureContainer demoImage="events.jpg" feature={'getItems'} alternatively='all'>
                    <div className="NicheEventsPage">
                        <div className="container">
                            <EventTour/>
                            <h1 className="PageTitle"><FormattedMessage id="event.title"/></h1>

                            <div className="Main">
                                <ListEvents events={events}/>

                                <div className="InfinityScroll">
                                    <Waypoint
                                        onEnter={this._handleViewMore}
                                    />

                                    {
                                        more ? <EventItemPlaceholder/> : <NoMoreEvent/>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </CanUseFeatureContainer>

            </DocTitle>
        );
    }
}

NicheEventsPage.propTypes = {
    history: PropTypes.object
};

export default NicheEventsPage;