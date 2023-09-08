import React, {Component} from "react";
import {connect} from "react-redux";
import OauthCallback from "./OauthCallback";
import {oauthCallback} from "../actions";

class OauthCallbackContainer extends Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        const {props} = this;

        return (
            <OauthCallback {...props}/>
        );
    }
}

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = {
    oauthCallback
};

export default connect(mapStateToProps, mapDispatchToProps)(OauthCallbackContainer);