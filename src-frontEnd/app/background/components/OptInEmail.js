import React, {Component} from "react";
import {Modal, ModalBody, Button} from "reactstrap";
import {_getOptInReceiveEmail, _postOptInReceiveEmail} from "../../../services/TrackingServices";
import getCookie from "../../../helpers/cookie/getCookie";
import setCookie from "../../../helpers/cookie/setCookie";
import classNames from "classnames";
import {FormattedMessage} from "react-intl";

class OptInEmail extends Component {
    state = {
        isOpen: false,
        subscribed: false
    };

    componentDidMount() {
        this._fetchAvailable();
    }

    _countView = () => {
        const currentView = getCookie('spyamz_view_count') || 0;
        const increaseView = parseInt(currentView, 10) + 1;
        setCookie('spyamz_view_count', increaseView);

        return increaseView;
    };

    _fetchAvailable = () => {
        const view = this._countView();
        if (view < 100) {
            return;
        }

        const _showGetOptIn = getCookie('showOptInEmail');

        if (_showGetOptIn) {
            return;
        }

        _getOptInReceiveEmail()
            .then(response => {
                const {success, data} = response;

                if (success) {
                    const {timeout, available} = data;

                    if (available) {
                        const timeoutValidated = timeout > 0 ? parseInt(timeout, 10) : 0;
                        setTimeout(() => {
                            setCookie('showOptInEmail', true, 3);

                            this.setState({
                                isOpen: true
                            });
                        }, timeoutValidated);
                    }
                }
            });
    };

    _handleClickConfirm = (allow = 'yes') => e => {
        e.preventDefault();

        const {subscribed} = this.state;
        if (subscribed) {
            return;
        }

        _postOptInReceiveEmail(allow)
            .then(() => {
                this.setState({
                    subscribed: true
                });

                setTimeout(() => {
                    this.setState({
                        isOpen: false
                    });
                }, 1000);
            })
            .catch(() => {
                setTimeout(() => {
                    this.setState({
                        isOpen: false
                    });
                }, 1000);
            })
    };

    _handleClose = (e) => {
        e.preventDefault();

        this.setState({
            isOpen: false
        });

        _postOptInReceiveEmail('no');
    };

    render() {
        const {isOpen, subscribed} = this.state;

        return (
            <Modal className={classNames("OptInEmail", {subscribed})} isOpen={isOpen}>
                <span onClick={this._handleClose} className="Close"><i className="linear-cross"/></span>

                <ModalBody>
                    <h2 className="Title"><FormattedMessage id="optin.title"/></h2>
                    <div className="SubTitle"><FormattedMessage id="optin.subtitle"/></div>

                    <div className="Description">
                        <FormattedMessage id="optin.description"/><br/>
                        <strong><FormattedMessage id="optin.description_strong"/></strong> <FormattedMessage
                        id="optin.description_end"/>
                    </div>

                    <div className="Arrow"/>

                    <Button color="link"
                            className={classNames("BtnSubscribe", {subscribed})}
                            onClick={this._handleClickConfirm('yes')}>
                        <span className="after"><FormattedMessage id="optin.thanks"/></span>
                        <span className="before"><FormattedMessage id="optin.subscribe"/></span>
                    </Button>
                </ModalBody>
            </Modal>
        );
    }
}

export default OptInEmail;