import React, {Component} from "react";
import PropTypes from "prop-types";
import {Modal, ModalBody} from "reactstrap";
import TMResults from "./TMResults";

class TrademarkPreviewResults extends Component {
    _handleToggle = (e) => {
        this.props.onClose();
    };

    render() {
        const {isOpen, results} = this.props;

        return (
            <Modal
                className="TrademarkPreviewResults"
                size="lg"
                backdrop
                toggle={this._handleToggle} isOpen={isOpen}>
                <ModalBody>
                    <TMResults results={results}/>
                </ModalBody>
            </Modal>
        );
    }
}

TrademarkPreviewResults.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    results: PropTypes.array.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default TrademarkPreviewResults;