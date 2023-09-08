import React, {Component} from "react";
import {connect} from "react-redux";
import ProfileSettings from "./ProfileSettings";
import {fetchProfile} from "../actions";
import {getSettingsProfile} from "../selectors";
import DocTitle from "../../../../shared-components/DocTitle";

class ProfileSettingsContainer extends Component {
    render() {
        const {props} = this;

        return (
            <DocTitle title="Your profile">
                <ProfileSettings {...props}/>
            </DocTitle>
        );
    }
}

const mapStateToProps = (state, props) => ({
    profileData: getSettingsProfile(state)
});

const mapDispatchToProps = {
    fetchProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettingsContainer);