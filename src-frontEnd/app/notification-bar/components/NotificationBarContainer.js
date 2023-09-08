import React, {Component} from "react";
import {connect} from "react-redux";
import NotifyModal from "./NotificationBar";
import EnsureLoggedInContainer from "../../../shared-containers/EnsureLoggedInContainer";
import {fetchNotificationBarAvailable, hideNotificationBar} from "../actions";
import {getNotificationData} from "../selectors";
import {getProfileData} from "../../../selectors/UserSelectors";

class NotificationBarContainer extends Component {
    render() {
        const {props} = this;

        return (
            <EnsureLoggedInContainer redirect={false}>
                <NotifyModal {...props} />
            </EnsureLoggedInContainer>
        );
    }
}

const mapStateToProps = (state, props) => ({
    data: getNotificationData(state),
    profile: getProfileData(state)
});

const mapDispatchToProps = {
    fetchNotificationBarAvailable,
    hideNotificationBar
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationBarContainer);