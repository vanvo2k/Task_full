import React, {Component} from "react";
import {connect} from "react-redux";
import LoginPage from "./LoginPage";
import {parseSearchQuery} from "../../../helpers/RouterHelper";
import {isAuthenticated} from "../../../selectors/AuthSelectors";
import StorageService from "../../../services/StorageServices";
import {socialLogin} from "../actions";
import DocTitle from "../../../shared-components/DocTitle";
import {getLoadingLogin, getMessageError} from "../selectors";

class LoginPageContainer extends Component {
    componentDidMount() {
        if (window.hasOwnProperty('fcWidget')) {
            window.fcWidget.hide()
        }
    }

    componentWillMount() {
        this._prepareRedirectTo();
    }

    render() {
        const {props} = this;

        return (
            <DocTitle title="Sign In">
                <LoginPage {...props}/>
            </DocTitle>
        );
    }

    _prepareRedirectTo() {
        const {history} = this.props;
        const querySearch = parseSearchQuery(history);
        const {redirectTo} = querySearch;

        if (redirectTo) {
            StorageService.set('redirectTo', redirectTo);
        }
    }
}

const mapStateToProps = (state, props) => ({
    isAuthenticated: isAuthenticated(state),
    message: getMessageError(state),
    loading: getLoadingLogin(state),
});

const mapDispatchToProps = {
    socialLogin
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPageContainer);
