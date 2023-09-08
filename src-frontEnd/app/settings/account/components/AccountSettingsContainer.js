import React, {Component} from "react";
import {connect} from "react-redux";
import AccountSettings from "./AccountSettings";

class AccountSettingsContainer extends Component {
    componentWillMount() {
        document.title = "Account settings";
    }

    render() {
        const {props} = this;

        return (
            <AccountSettings {...props}/>
        );
    }
}

export default connect()(AccountSettingsContainer);