import React, {Component} from 'react'
import {_getAnnouncement,_countAnnouncement,_markReadAnnouncement} from "../../../../../services/AnnouncementServices";
import {Dropdown, DropdownMenu, DropdownToggle} from "reactstrap"
import AdsAnnouncementItem from "./AdsAnnouncementItem";
import AdsAnnouncementDetailModal from "./AdsAnnouncementDetailModal";
import classNames from "classnames";

class AdsAnnouncementContainer extends Component {
    state = {
        count: '',
        announcements: [],
        isOpen: false,
        isOpenModal: false,
        announcementModal: {}
    }

    componentDidMount() {
        this._getCountAnnouncement()
        this._fetchAnnouncement()
    }

    _getCountAnnouncement = () => {
        _countAnnouncement()
            .then(result => {
                if (result.success) {
                    const {data} = result
                    this.setState({
                        count: data
                    })
                } else {
                    console.log(result.message)
                }
            })
            .catch(e => {
                console.log(e)
            })
    }

    _fetchAnnouncement = () => {
        _getAnnouncement()
            .then(response => {
                const {success, data} = response
                if (success && Object.entries(data).length !== 0) {
                    this.setState({
                        announcements: data
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    _toggleDropdownButton = () => {
        if (!this.state.isOpenModal) {
            this.setState(({isOpen}) => ({
                isOpen: !isOpen,
            }))
        }
    }

    _handleOpenModal = (announcement) => {
        if (!announcement.read) {
            _markReadAnnouncement(announcement._id)
                .then(response => {
                    const {success} = response
                    if (success) {
                        this._getCountAnnouncement()
                        this._fetchAnnouncement()
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }

        this.setState({
            isOpenModal: true,
            announcementModal: announcement
        })
    }

    _handleToggleModal = () => {
        this.setState(({isOpenModal}) => ({
            isOpenModal: !isOpenModal
        }))
    }

    render() {
        const {count, isOpen, announcements, isOpenModal, announcementModal} = this.state

        return (
            <div className="AdsAnnouncement">
                <Dropdown isOpen={isOpen} toggle={this._toggleDropdownButton}>
                    <DropdownToggle>
                        <i className="linear-alarm"/>
                        {
                            !!count && <span className="count">{count}</span>
                        }
                    </DropdownToggle>
                    <DropdownMenu right>
                        {
                            <ul className="AdsAnnouncementList">
                                {
                                    !!announcements.length && announcements.map((announcement, index) => {
                                        return <AdsAnnouncementItem key={index} announcement={announcement}
                                                                    onClickOpenModal={this._handleOpenModal}/>
                                    })
                                }
                                {
                                    !announcements.length && <li className={classNames("AdsAnnouncementItem")}>
                                        <div className="AnnouncementItemBox">
                                            <div className="text-lg-center NoNotifications">
                                                <i className="linear-alarm-ringing text-lg-center"/>
                                            </div>
                                            <h5 className="text-center">No Notifications Yet</h5>
                                        </div>
                                    </li>
                                }
                            </ul>
                        }
                    </DropdownMenu>
                </Dropdown>

                <AdsAnnouncementDetailModal isOpenModal={isOpenModal} announcementModal={announcementModal}
                                            ontoggleModal={this._handleToggleModal}/>
            </div>
        )
    }
}

export default AdsAnnouncementContainer
