import React, {Component} from "react";
import {connect} from "react-redux";
import Header from "./Header";
import {isAuthenticated} from "../../../selectors/AuthSelectors";
import {getProfileData, isAdmin} from "../../../selectors/UserSelectors";
import {logOut} from "../../../actions/AuthActions";
import {withRouter} from "react-router-dom";

class HeaderContainer extends Component {
    render() {
        const {props} = this;

        return (
            <Header {...props}/>
        );
    }
}

const mapStateToProps = (state, props) => ({
    isAuthenticated: isAuthenticated(state),
    profile: getProfileData(state),
    isAdmin: isAdmin(state)
});

const mapDispatchToProps = {
    logOut
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderContainer));