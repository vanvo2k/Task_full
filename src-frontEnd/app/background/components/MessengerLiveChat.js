import React, {Component} from "react";
import {getUserLanguage} from "../../../services/LocaleServices";

class MessengerLiveChat extends Component {
    render() {
        return (
            <div className="fb-customerchat" greeting_dialog_display="hide" page_id="140068410039355"/>
        );
    }

    componentDidMount() {
        this._configMessenger();
    }

    _configMessenger() {
        const userLanguage = getUserLanguage();

        const sdkLanguage = userLanguage === 'vi' ? 'vi_VN' : 'en_US';

        window.fbAsyncInit = function () {
            window.FB && window.FB.init({
                appId: '380442572375167',
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v2.11'
            });
        };

        (function (d, s, id) {
            let js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = `https://connect.facebook.net/${sdkLanguage}/sdk.js`;
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }
}

export default MessengerLiveChat;

