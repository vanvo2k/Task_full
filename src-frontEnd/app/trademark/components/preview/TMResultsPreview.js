import React, {Component} from "react"
import PropTypes from "prop-types"
import classes from "classnames"
import TMResults from "./TMResults"
import {Modal, ModalBody} from "reactstrap"

class TMResultsPreview extends Component {
    render() {
        const {item, isOpen, hideTrademarkResults,userScope,onUpgradePopup} = this.props

        if (!item) {
            return null
        }

        const results = item.get('results')

        return (
            <Modal isOpen={isOpen}
                   size="lg"
                   backdrop={true}
                   toggle={hideTrademarkResults}
                   className={classes("TMResultsPreview", {isOpen})}>
                <ModalBody>
                    <TMResults results={results} userScope={userScope} onUpgradePopup={onUpgradePopup} onHideTrademarkResults={hideTrademarkResults}/>
                </ModalBody>
            </Modal>
        )
    }
}

TMResultsPreview.propTypes = {
    item: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    isOpen: PropTypes.bool.isRequired,
    hideTrademarkResults: PropTypes.func.isRequired,
}

export default TMResultsPreview
