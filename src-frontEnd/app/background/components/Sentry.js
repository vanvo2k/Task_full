import {Component} from "react";
import addScript from "../../../helpers/common/addScript";

class Sentry extends Component {
    componentDidMount() {
        addScript('https://cdn.ravenjs.com/3.21.0/raven.min.js')
            .then(() => {
                if (window.Raven) {
                    const {Raven} = window;
                    Raven.config('https://27bf6c8c12d249c0acc24882fd7de225@sentry.io/262563').install();

                    window.LogRocket && Raven.setDataCallback(function (data) {
                        data.extra.sessionURL = window.LogRocket.sessionURL;
                        return data;
                    });
                }
            });
    }

    render() {
        return null;
    }
}

export default Sentry;