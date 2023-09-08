import {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {isAuthenticated} from "../../../selectors/AuthSelectors";
import {getProfileData} from "../../../selectors/UserSelectors";
import ReactGA from "react-ga";

class GoogleAnalytics extends PureComponent {
    loaded = false;

    componentWillMount() {
        this._load();
    }

    _load() {
        if (this.loaded) {
            return;
        }

        this.loaded = true;

        ReactGA.initialize('UA-111124734-1');
        window.addEventListener('GAEvent', (e) => {
            const args = e.detail;
            ReactGA.event(args);
        });
    }

    componentDidMount() {
        const {isAuthenticated, profile, history} = this.props;
        const {id} = profile.toJS();

        if (isAuthenticated) {
            ReactGA.set({userId: id});
        }

        history.listen((location, action) => {
            const {pathname, search} = location;

            ReactGA.pageview(pathname + search);
        });
    }

    render() {
        const {history} = this.props;
        const {pathname, search} = history.location;

        ReactGA.pageview(pathname + search);

        return null;
    }
}

GoogleAnalytics.propTypes = {
    history: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: isAuthenticated(state),
    profile: getProfileData(state)
});

export default withRouter(connect(mapStateToProps)(GoogleAnalytics));