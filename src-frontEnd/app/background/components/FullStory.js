import {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {isAuthenticated} from "../../../selectors/AuthSelectors";
import {getProfileData, isAdmin} from "../../../selectors/UserSelectors";
import {_getFullStoryAvailable} from "../../../services/TrackingServices";

class FullStory extends Component {
    loaded = false;

    state = {
        available: false
    };

    componentDidUpdate() {
        const {available} = this.state;

        if (this.loaded || !available) {
            return;
        }

        this._load();
        this._identify();
    }

    _load() {
        this.loaded = true;

        /*eslint-disable */
        window['_fs_debug'] = false;
        window['_fs_host'] = 'fullstory.com';
        window['_fs_org'] = '9CSED';
        window['_fs_namespace'] = 'FS';
        (function (m, n, e, t, l, o, g, y) {
            if (e in m) {
                if (m.console && m.console.log) {
                    m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].');
                }
                return;
            }
            g = m[e] = function (a, b) {
                g.q ? g.q.push([a, b]) : g._api(a, b);
            };
            g.q = [];
            o = n.createElement(t);
            o.async = 1;
            o.src = 'https://' + _fs_host + '/s/fs.js';
            y = n.getElementsByTagName(t)[0];
            y.parentNode.insertBefore(o, y);
            g.identify = function (i, v) {
                g(l, {uid: i});
                if (v) g(l, v)
            };
            g.setUserVars = function (v) {
                g(l, v)
            };
            y = "rec";
            g.shutdown = function (i, v) {
                g(y, !1)
            };
            g.restart = function (i, v) {
                g(y, !0)
            };
            g.identifyAccount = function (i, v) {
                o = 'account';
                v = v || {};
                v.acctId = i;
                g(o, v)
            };
            g.clearUserCookie = function (c, d, i) {
                if (!c || document.cookie.match('fs_uid=[`;`]*`[`;`]*`[`;`]*`')) {
                    d = n.domain;
                    while (1) {
                        n.cookie = 'fs_uid=;domain=' + d +
                            ';path=/;expires=' + new Date(0).toUTCString();
                        i = d.indexOf('.');
                        if (i < 0) break;
                        d = d.slice(i + 1)
                    }
                }
            };
        })(window, document, window['_fs_namespace'], 'script', 'user');
        /*eslint-enable */
    }

    _identify() {
        const {isAuthenticated, profile} = this.props;
        const {name, email, id} = profile.toJS();

        if (process.env.REACT_APP_ENV === 'production' && isAuthenticated) {
            window.FS && window.FS.identify(id, {
                displayName: name,
                email: email,
            });
        }
    }

    componentDidMount() {
        const {isAuthenticated} = this.props;

        if (!isAuthenticated) {
            return;
        }

        _getFullStoryAvailable()
            .then(result => {
                const {data, success} = result;

                if (success) {
                    this.setState({
                        available: data
                    });
                }
            });
    }

    render() {
        return null;
    }
}

FullStory.propTypes = {
    isAdmin: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: isAuthenticated(state),
    profile: getProfileData(state),
    isAdmin: isAdmin(state)
});

export default withRouter(connect(mapStateToProps)(FullStory));