import React, {Component} from 'react'
import {Modal, ModalBody, ModalFooter, Input, Button} from "reactstrap"
import {FormattedMessage} from "react-intl";
import PropTypes from "prop-types"

const MAX_ITEMS = 5000

class ExportPopup extends Component {
    state = {
        numOfItems : 1
    }

    _handleChangeInput = (e) => {
        const value = parseInt(e.target.value, 10)
        const valueChanged = isNaN(value) ? 0 : value
        const validatedValue = valueChanged > MAX_ITEMS ? MAX_ITEMS : valueChanged

        this.setState({
            numOfItems: validatedValue
        })
    }

    _handleClickExport = (e) => {
        e.preventDefault()
        const {onExport} = this.props
        const {numOfItems} = this.state
        onExport(numOfItems)
        this.setState({
            numOfItems: 1
        })
    }

    render() {
        const {isOpen, onTogglePopup} = this.props
        const {numOfItems} = this.state

        return (
            <Modal isOpen={isOpen} toggle={onTogglePopup} size='sm'>
                <ModalBody>
                    <div className='modal-closer float-right' onClick={onTogglePopup}>
                        <i className="linear-cross"/>
                    </div>
                    <div className="Wrapper">
                        <div className="Inner">
                            <h6>Number of items:</h6>
                            <Input value={numOfItems} onChange={this._handleChangeInput}
                                    type="number" min={1} max={MAX_ITEMS}
                            />
                            <p><small><span className="text-danger">(*)</span> Maximum: 5000</small></p>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className="p-2">
                    <Button className="p-1" onClick={this._handleClickExport}>
                        <FormattedMessage id="searchItem.header.export"/>
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
}

ExportPopup.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onExport: PropTypes.func.isRequired,
    onTogglePopup: PropTypes.func.isRequired
}

export default ExportPopup
