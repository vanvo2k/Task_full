import React, {Component} from "react";
import {connect} from "react-redux";
import AnnouncementBar from "./AnnouncementBar";
import EnsureLoggedInContainer from "../../../shared-containers/EnsureLoggedInContainer";
import {fetchAnnouncementBarAvailable, markRead} from "../actions";
import {getAnnouncementData} from "../selectors";

class AnnouncementBarContainer extends Component {
    render() {
        const {props} = this;
console.log('bar container')
        return (
            <EnsureLoggedInContainer redirect={false}>
                <AnnouncementBar {...props}/>
            </EnsureLoggedInContainer>
        );
    }
}

const mapStateToProps = (state, props) => ({
    data: getAnnouncementData(state)
});

const mapDispatchToProps = {
    fetchAnnouncementBarAvailable,
    markRead
}

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementBarContainer);