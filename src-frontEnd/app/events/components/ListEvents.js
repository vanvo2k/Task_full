import React, {Component} from "react";
import PropTypes from "prop-types";
import EventItem from "./EventItem";

class ListEvents extends Component {
    render() {
        const {events} = this.props;

        return (
            <div className="ListEvents">
                {
                    events.map(event => {
                        return (
                            <EventItem key={event._id} event={event}/>
                        );
                    })
                }
            </div>
        );
    }
}

ListEvents.propTypes = {
    events: PropTypes.array,
};

export default ListEvents;