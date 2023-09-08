import React, {Component} from "react";
import addScript from "../../../helpers/common/addScript";
import {getTapId, setTapId} from "../../../services/TapfiliateServices";

class Tapfiliate extends Component {
    componentWillMount() {
        addScript('https://static.tapfiliate.com/tapfiliate.js', 'tapfiliate')
            .then(() => {
                this._initAndDetect();
            });
    }

    _initAndDetect() {
        (function (t, a, p) {
            t.TapfiliateObject = a;
            t[a] = t[a] || function () {
                (t[a].q = t[a].q || []).push(arguments)
            }
        })(window, 'tap');

        window.tap('create', '6438-b14536');
        window.tap('detect', {}, () => {
            const {vid} = window.tap;

            setTapId(vid);
        });
    }

    render() {
        const vid = getTapId();

        return (
            <input value={vid} name="tap_vid" type="hidden"/>
        );
    }
}

export default Tapfiliate;