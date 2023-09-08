import {Component} from "react";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";

class Segment extends Component {
    loaded = false;

    componentWillMount() {
        this._script();
        this._loadDrift();
    }

    componentDidMount() {
        this._onPageView();
    }

    _onPageView() {
        const {history} = this.props;

        history.listen(() => {
            window.analytics && window.analytics.page();
        });
    }

    _loadDrift() {
        if (!this.loaded) {
            this.loaded = true;
        }
    }

    _script() {
        /*eslint-disable */
        !function () {
            var analytics = window.analytics = window.analytics || [];
            if (!analytics.initialize) if (analytics.invoked) window.console && console.error && console.error("Segment snippet included twice."); else {
                analytics.invoked = !0;
                analytics.methods = ["trackSubmit", "trackClick", "trackLink", "trackForm", "pageview", "identify", "reset", "group", "track", "ready", "alias", "debug", "page", "once", "off", "on"];
                analytics.factory = function (t) {
                    return function () {
                        var e = Array.prototype.slice.call(arguments);
                        e.unshift(t);
                        analytics.push(e);
                        return analytics
                    }
                };
                for (var t = 0; t < analytics.methods.length; t++) {
                    var e = analytics.methods[t];
                    analytics[e] = analytics.factory(e)
                }
                analytics.load = function (t) {
                    var e = document.createElement("script");
                    e.type = "text/javascript";
                    e.async = !0;
                    e.src = ("https:" === document.location.protocol ? "https://" : "http://") + "cdn.segment.com/analytics.js/v1/" + t + "/analytics.min.js";
                    var n = document.getElementsByTagName("script")[0];
                    n.parentNode.insertBefore(e, n)
                };
                analytics.SNIPPET_VERSION = "4.0.0";
                analytics.load("YK23OpNnHZgtMwMDOixLaL6gb3WzTkVI");
            }
        }();
        /*eslint-enable */
    }

    render() {
        return null;
    }
}

Segment.propTypes = {
    history: PropTypes.object.isRequired
};

export default withRouter(Segment);