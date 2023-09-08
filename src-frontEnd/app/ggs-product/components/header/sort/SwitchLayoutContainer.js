import React, {Component} from "react";
import {connect} from "react-redux";
import SwitchLayout from "./SwitchLayout";
import {switchLayout} from "../../../actions";
import {getCurrentLayout} from "../../../selectors";
import {saveUserSettings} from "../../../../../actions/UserActions";

class SwitchLayoutContainer extends Component {
    render() {
        const {props} = this;

        return <SwitchLayout {...props}/>
    }
}

const mapStateToProps = (state, props) => ({
    layout: getCurrentLayout(state)
});

const mapDispatchToProps = {
    switchLayout,
    saveUserSettings
};

export default connect(mapStateToProps, mapDispatchToProps)(SwitchLayoutContainer);