import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {Button} from "reactstrap";
import {Link} from "react-router-dom";

class AnnouncementBar extends Component {
    state = {
        isHidden: false
    };

    componentDidMount() {
        const {fetchAnnouncementBarAvailable} = this.props;
        fetchAnnouncementBarAvailable()
            .then(response => {
                const {success} = response;

                if (!success) {
                    this.setState({
                        isHidden: true
                    })
                }
            })
    }

    render() {
        const {data} = this.props;
        const {isHidden} = this.state;
        const description = data.get('description');
        const link = data.get('link');
        const buttonText = data.get('buttonText');

        if (!description) {
            return null;
        }

        const CTA = link ?
            <Button onClick={this._closeNotification} tag={Link} to={link} className="Action">{buttonText}</Button> :
            (buttonText ? <Button onClick={this._closeNotification} className="Action">{buttonText}</Button> : '')

        const classes = classNames("NotificationBar", {isHidden: isHidden});

        return (
            <div ref="root" className={classes}>
                <div className="Inner d-flex justify-content-center align-items-center">
                    <div onClick={this._handleClickIgnore} className="Close">×</div>

                    <div className="Text">{description}</div>

                    <div className="Actions">
                        {!!CTA && CTA}

                        <Button
                            onClick={this._handleClickIgnore}
                            color="link" className="Ignore">Ignore</Button>
                    </div>
                </div>
            </div>
        );
    }

    _closeAnnouncement = () => {
        const {data} = this.props
        const announcementId = data.get('id')

        this.props.markRead({announcementId})
            .then(() => {
                this.setState({
                    isHidden: true
                });
            });
    };

    _handleClickIgnore = (e) => {
        e.preventDefault();

        this._closeAnnouncement();
    }
}

AnnouncementBar.propTypes = {
    data: PropTypes.object.isRequired,
    fetchAnnouncementBarAvailable: PropTypes.func.isRequired,
    markRead: PropTypes.func.isRequired
}

export default AnnouncementBar;