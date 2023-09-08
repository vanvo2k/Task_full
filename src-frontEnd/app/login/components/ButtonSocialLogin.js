import React, {Component} from "react";
import {Button} from "reactstrap";
import PropTypes from "prop-types";
import classNames from "classnames";

class ButtonSocialLogin extends Component {
    render() {
        const {provider, buttonText, loading} = this.props;

        return (
            <Button disabled={loading} onClick={this._handleLogin.bind(this)} block
                    className={classNames('ButtonSocial', provider)}>{buttonText}</Button>
        );
    }

    _handleLogin() {
        const {provider, socialLogin} = this.props;
        socialLogin(provider);
    }
}

ButtonSocialLogin.propTypes = {
    loading: PropTypes.bool.isRequired,
    provider: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    socialLogin: PropTypes.func.isRequired
};

export default ButtonSocialLogin;