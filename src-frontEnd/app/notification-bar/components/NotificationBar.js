import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {Button} from "reactstrap";
import {Link} from "react-router-dom";
import getCookie from "../../../helpers/cookie/getCookie";
import setCookie from "../../../helpers/cookie/setCookie";
import * as RealtimeServices from "../../../services/ws/RealtimeServices";

class NotificationBar extends Component {
    state = {
        isHidden: !!getCookie('hideNotificationBar')
    };

    componentDidMount() {
        const {fetchNotificationBarAvailable} = this.props;
        fetchNotificationBarAvailable();

        RealtimeServices.subscribe('notification-bar', (force) => {
            if (force) {
                setCookie('hideNotificationBar', false, 1);
                this.setState({
                    isHidden: false
                });
            }

            fetchNotificationBarAvailable();
        });
    }

    render() {
        const {data,} = this.props;
        const message = data.get('message');
        const {isHidden} = this.state;

        if (!message) {
            return null;
        }

        const link = data.get('link');
        const buttonText = data.get('buttonText');

        const CTA = link ?
            <Button onClick={this._closeNotification} tag={Link} to={link} className="Action">{buttonText}</Button> :
            <Button onClick={this._closeNotification} className="Action">{buttonText}</Button>;

        const classes = classNames("NotificationBar", {hidden: isHidden});

        return (
            <div ref="root" className={classes}>
                <div className="Inner d-flex justify-content-center align-items-center">
                    <div onClick={this._handleClickIgnore} className="Close">×</div>

                    <div className="Text">{message}</div>

                    <div className="Actions">
                        {CTA}

                        <Button
                            onClick={this._handleClickIgnore}
                            color="link" className="Ignore">Ignore</Button>
                    </div>
                </div>
            </div>
        );
    }

    _closeNotification = () => {
        this.props.hideNotificationBar()
            .then(() => {
                this.setState({
                    isHidden: true
                });
            });
    };

    _handleClickIgnore = (e) => {
        e.preventDefault();

        this._closeNotification();
    }
}

NotificationBar.propTypes = {
    data: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    fetchNotificationBarAvailable: PropTypes.func.isRequired,
    hideNotificationBar: PropTypes.func.isRequired,
};

export default NotificationBar;