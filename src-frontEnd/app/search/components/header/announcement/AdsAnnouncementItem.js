import React, {Component} from 'react'
import PropTypes from "prop-types";
import timeHuman from "../../../../../helpers/time/timeHuman";
import classNames from "classnames"

class AdsAnnouncementItem extends Component {
    _handleClickOpenModal = () => {
        const {onClickOpenModal, announcement} = this.props
        onClickOpenModal(announcement);
    }

    render() {
        const {announcement} = this.props

        const contentHtml = {
            __html: announcement.description
        }

        const createdTime = announcement.created_at ? timeHuman(announcement.created_at, ' DD/MM/YYYY hh:mm')
            : timeHuman(announcement.start_time, ' DD/MM/YYYY hh:mm')

        return (
            <li className={classNames("AdsAnnouncementItem", {read: announcement.read})}
                onClick={this._handleClickOpenModal}>
                <div className="AnnouncementItemBox">
                    <h5 className="title">{announcement.title}</h5>
                    <p dangerouslySetInnerHTML={contentHtml} className="description text-muted"/>
                    <span className="time text-muted">
                        <i className="far fa-clock"/>
                        {createdTime}
                    </span>
                </div>
            </li>
        )
    }
}

AdsAnnouncementItem.propTypes = {
    announcement: PropTypes.object.isRequired,
    onClickOpenModal: PropTypes.func
}

export default AdsAnnouncementItem
