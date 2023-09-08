import React, {Component} from "react";
import {connect} from "react-redux";
import Dashboard from "./Dashboard";
import EnsureLoggedInContainer from "../../../shared-containers/EnsureLoggedInContainer";
import {toggleCollapseSidebar} from "../actions";
import {isOpenSidebar} from "../selectors";
import "react-datepicker/dist/react-datepicker.css";

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

class DashboardContainer extends Component {
    render() {
        const {props} = this;
        const {match} = props;
        const {path} = match;

        return (
            <EnsureLoggedInContainer>
                <Dashboard basePath={path} {...props}/>
            </EnsureLoggedInContainer>
        );
    }
}

const mapStateToProps = (state, props) => ({
    isOpenSidebar: isOpenSidebar(state)
});

const mapDispatchToProps = {
    toggleCollapseSidebar
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);