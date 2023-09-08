import React, {Component} from "react";
import PropTypes from "prop-types";
import StorageService from "../../../services/StorageServices";
import {getAppURL} from "../../../helpers/CommonHelper";
import Loading from "../../../shared-components/Loading";

class OauthCallback extends Component {
    componentDidMount() {
        const {history, oauthCallback} = this.props;
        oauthCallback(history)
            .then(() => {
                const redirectTo = StorageService.get('redirectTo', '/a');
                StorageService.remove('redirectTo');

                const appUrl = getAppURL('');
                if (redirectTo.indexOf(appUrl) === 0) {
                    const redirect = redirectTo.replace(appUrl, '');

                    return history.push(redirect);
                }

                return history.push(redirectTo);
            });
    }

    render() {
        return (
            <div className="oauth-callback">
                <Loading/>
            </div>
        );
    }
}

OauthCallback.propTypes = {
    oauthCallback: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
};

export default OauthCallback;