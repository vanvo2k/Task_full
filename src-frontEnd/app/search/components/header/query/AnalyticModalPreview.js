import React, {Component} from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import classNames from "classnames";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";


class AnalyticModalPreview extends Component {
    state = {
        canSaving: false
    };

    render() {
        const {className, isOpen} = this.props;

        return (
            <Modal size="lg" isOpen={isOpen} className={classNames("AnalyticModalPreview", className)}>
                <ModalHeader><FormattedMessage id="searchItem.header.analytic_preview"/></ModalHeader>
                <ModalBody>
                    hello
                </ModalBody>
                <ModalFooter className="d-flex justify-content-between">
                    <Button color="primary" onClick={this._onClickSaveQuery.bind(this)}><FormattedMessage id="searchItem.header.save_query"/></Button>
                    <Button color="secondary" onClick={this._onClose.bind(this)}>><FormattedMessage id="general.close"/></Button>
                </ModalFooter>
            </Modal>
        );
    }

    _onClose() {
        this.props.onClose();
    }

    _onClickSaveQuery() {
        const {onSaveQuery} = this.props;

        onSaveQuery && onSaveQuery();
    }
}

AnalyticModalPreview.propTypes = {
    onSaveQuery: PropTypes.func,
    query: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default AnalyticModalPreview;