import {Component} from "react";
import PropTypes from "prop-types";
import {_getLogRocketAvailable} from "../../../services/TrackingServices";
import {getProfileData} from "../../../selectors/UserSelectors";
import {isAuthenticated} from "../../../selectors/AuthSelectors";
import {connect} from "react-redux";

class LogRocket extends Component {
    componentDidMount() {
        this._loadLogRocket();
    }

    render() {
        return null;
    }

    _loadLogRocket() {
        const {isAuthenticated, profile} = this.props;
        const {name, email, id} = profile.toJS();

        if (!isAuthenticated) {
            return;
        }

        if (process.env.REACT_APP_ENV === 'production') {
            const _load = () => {
                const LogRocket = require("logrocket");

                LogRocket.init('edxqbt/spyamz');
                LogRocket.identify(id, {
                    name,
                    email
                });
            };

            _getLogRocketAvailable()
                .then(result => {
                    const {data, success} = result;

                    if (success && data) {
                        _load();
                    }
                });
        }
    }
}

LogRocket.propTypes = {
    profile: PropTypes.object,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    isAuthenticated: isAuthenticated(state),
    profile: getProfileData(state),
});

export default connect(mapStateToProps)(LogRocket);