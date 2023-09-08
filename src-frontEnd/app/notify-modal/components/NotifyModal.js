import React, {Component} from "react";
import Proptypes from "prop-types";
import classNames from "classnames";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {Link} from "react-router-dom";
import {FormattedMessage} from "react-intl";

class NotifyModal extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        const {data} = this.props;
        if (data.get('isOpen')) {
            this.props.hideNotify();
        } else {
            this.props.showNotify({title: '', content: ""});
        }
    }

    _handleClickRefresh = () => {
        this.props.hideNotify();
        window.location.reload(true);
    };

    render() {
        const {data} = this.props;
        const {isOpen, title, content, button, upgradePlan, contact, contactLink, refresh} = data.toJS();

        return (
            <Modal backdrop="static" className={classNames("NotifyModal", {isOpen})} isOpen={isOpen}
                   toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
                <ModalBody>
                    <p>{content}</p>
                </ModalBody>
                <ModalFooter>
                    {
                        !!contact &&
                        <a className="btn btn-primary mr-auto"
                           rel="noopener noreferrer"
                           target="_blank" href={contactLink}>
                            <FormattedMessage id="general.contact_now"/>
                        </a>
                    }

                    {
                        !!refresh &&
                        <button onClick={this._handleClickRefresh} className="btn btn-primary mr-auto">
                            <FormattedMessage id="general.refresh"/>
                        </button>
                    }

                    {
                        upgradePlan
                            ? <Button color="primary" onClick={this.toggle} tag={Link} to='/pricing'>
                                <FormattedMessage id="general.upgrade_now"/></Button>
                            : <Button color="primary" onClick={this.toggle}>
                                <FormattedMessage id="general.close"/>
                            </Button>
                    }
                </ModalFooter>
            </Modal>
        );
    }
}

NotifyModal.propTypes = {
    showNotify: Proptypes.func,
    hideNotify: Proptypes.func,
    data: Proptypes.object
};

export default NotifyModal;