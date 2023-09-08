import React, {Component} from "react"
import {Modal, ModalBody} from "reactstrap"
import classNames from "classnames";

class AdsAnnouncementDetailModal extends Component {
    _handleCloseModal = () => {
        this.props.ontoggleModal()
    }

    render() {
        const {isOpenModal, announcementModal} = this.props

        const contentHtml = {
            __html: announcementModal.description
        }
        return (
            <Modal
                isOpen={isOpenModal}
                className="popup-announcement"
                toggle={this._handleCloseModal}
                size="lg">
                <ModalBody>
                    <div className="modal-closer" onClick={this._handleCloseModal}>
                        <i className="linear-cross"/>
                    </div>
                    <div className="Wrapper">
                        <div className="Inner">
                            <div className={classNames('AdsAnnouncementModal Fade')}>
                                <div className="container">
                                    <h3 className="title">{announcementModal.title}</h3>
                                    <hr/>
                                    <p dangerouslySetInnerHTML={contentHtml} className="description"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        )
    }
}

export default AdsAnnouncementDetailModal
