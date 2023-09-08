import React, {Component} from "react"
import classNames from "classnames"
import PropTypes from "prop-types"
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap"
import {FormattedMessage} from "react-intl"

class ServerError extends Component {
    render() {
        const {className, isOpen, error, countError} = this.props

        if (!error || !error.size) {
            return null
        }

        return (
            <Modal size="lg" backdrop="static" className={classNames("ServerError text-center", className)}
                   isOpen={isOpen && countError > 5}
                   toggle={this._onClose.bind(this)}>
                <ModalHeader toggle={this._onClose.bind(this)}>{error.get('title') || 'Unexpected Error'}</ModalHeader>
                <ModalBody>
                    <div className="Images d-flex align-items-center justify-content-center">
                        <span className="Number">5</span>
                        <img className="Icon" src="/assets/images/icon-500.svg" alt="server error"/>
                        <span className="Number">0</span>
                    </div>

                    <div className="Message">
                        <code>{error.get('message')}</code>
                    </div>

                    <div className="Help">
                        <FormattedMessage id="serverError.help"/>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this._onClose.bind(this)}><FormattedMessage
                        id="serverError.ignore"/></Button>
                    <Button color="primary" onClick={this._onRefresh.bind(this)}><FormattedMessage
                        id="serverError.refresh"/></Button>
                </ModalFooter>
            </Modal>
        )
    }

    _onClose() {
        this.props.toggleModal()
    }

    _onRefresh() {
        this.props.toggleModal()
        window.location.reload(true)
    }
}

ServerError.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    error: PropTypes.object,
    countError: PropTypes.number,
    toggleModal: PropTypes.func.isRequired,
}

export default ServerError