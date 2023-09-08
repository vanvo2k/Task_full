import React, {Component} from "react";
import {Container} from "reactstrap";
import classNames from "classnames";
import PropTypes from "prop-types";
import {Redirect} from "react-router-dom";
import ButtonSocialLogin from "./ButtonSocialLogin";
import {FormattedMessage} from "react-intl";
import withViewport from "../../../shared-components/withViewport";
import Loading from "../../../shared-components/Loading";
import GoogleLogin from 'react-google-button'
import {_updateAffiliate} from "../../../services/UserService";
import queryString from 'query-string';
import getEnv from '../../../helpers/common/getEnv'

class LoginPage extends Component {

    _handleGoogleLogin = () => {
        const params = queryString.parse(window.location.search)
        const endpoint = (params.code)
            ? `?af=${encodeURIComponent(JSON.stringify({af: params.code}))}` 
            : ''
        window.location.href = `${getEnv('passportAuthentication')}/auth/google${endpoint}`
    }


    render() {
        const {props} = this;
        const {isAuthenticated, isMobile, message, loading} = props;

        if (isAuthenticated) {
            const params = queryString.parse(window.location.search);
            if (params.code) {
                _updateAffiliate(params.code)
                    .then(_result => { })
                    .catch(err => { console.error('updateAf', err.message) })

            }

            return <Redirect push to="/"/>
        }

        const source = isMobile ? 'https://spyamz.s3.us-west-1.amazonaws.com/spyamz-images/video-mobile.mp4' : 'https://spyamz.s3.amazonaws.com/spyamz-images/video-desktop.mp4';

        return (
            <Container className={classNames("LoginPage", {noError: !message})}>
                <div className="Background">
                    <video preload="none" playsInline autoPlay muted loop>
                        <source src={source} type="video/mp4"/>
                    </video>
                </div>

                <div className="Wrapper">
                    <Loading loading={loading}/>

                    <h1 className="Header"><FormattedMessage id="signIn.title"/></h1>
                    <div className="LoginMethod">
                        {
                            !!message &&
                            <div className="Error text-center">{message}</div>
                        }

                        <p className="Description"><FormattedMessage id="signIn.description"/></p>

                        <div className="WrapperBtnSocial">
                            <ButtonSocialLogin {...props} provider="facebook"
                                buttonText="Facebook" />
                            <GoogleLogin onClick={this._handleGoogleLogin} />
                        </div>

                        <div className="WrapperOtherTools">
                            <a href="https://app.spybadao.com" target="_blank" className="tool-item spybadass">
                                <img src="/assets/images/spyads.png" />
                            </a>

                            <a href="https://app.spyetsy.com" target="_blank" className="tool-item spyetsy">
                                <img src="/assets/images/spyetsy.png" />
                            </a>
                        </div>
                    </div>
                </div>
            </Container>
        );
    }
}

LoginPage.propTypes = {
    isMobile: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    socialLogin: PropTypes.func.isRequired
};

export default withViewport(LoginPage);
