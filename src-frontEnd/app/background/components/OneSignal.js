import {Component} from "react";
import PropTypes from "prop-types";
import addScript from "../../../helpers/common/addScript";
import withAuthentication from "../../../shared-components/withAuthentication";
import getEnv from "../../../helpers/common/getEnv";
import getCookie from "../../../helpers/cookie/getCookie";
import setCookie from "../../../helpers/cookie/setCookie";

class OneSignalComponent extends Component {
    static _init = false;

    componentDidMount() {
        if (OneSignalComponent._init) {
            return;
        }

        OneSignalComponent._init = true;
        const view = this._countView();
        if (view < 50) {
            return;
        }

        addScript('https://cdn.onesignal.com/sdks/OneSignalSDK.js')
            .then(() => {
                let OneSignal = window.OneSignal || [];
                OneSignal.push(() => {

                    setTimeout(() => {
                        this._init();
                    }, 10000);
                });
            });
    }

    _countView = () => {
        const currentView = getCookie('spyamz_view_count') || 0;
        const increaseView = parseInt(currentView, 10) + 1;
        setCookie('spyamz_view_count', increaseView);

        return increaseView;
    };

    _init = () => {
        const OneSignal = window.OneSignal || [];
        const appId = getEnv('onesignal');

        OneSignal.init({
            appId
        });

        const {user} = this.props;
        const profile = user.get('profile');
        const {id, email, name} = profile ? profile.toJS() : {};

        if (!id || !email) {
            return;
        }

        OneSignal.setEmail(email);
        OneSignal.sendTags({
            userId: id,
            email,
            real_name: name
        });
    };

    render() {
        return null;
    }
}

OneSignalComponent.propTypes = {
    user: PropTypes.object.isRequired,
};

export default withAuthentication(OneSignalComponent);