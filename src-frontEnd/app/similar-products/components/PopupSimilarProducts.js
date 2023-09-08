import React, {Component} from "react"
import PropTypes from "prop-types"
import {Modal, ModalBody} from "reactstrap"
import SimilarProducts from "../shared/SimilarProducts"
import getHistory from "../../../store/getHistory"

class PopupSimilarProducts extends Component {
    _unListenHistory = null

    componentDidMount() {
        const history = getHistory()
        this._unListenHistory = history.listen(this._onChangeHistory)
    }

    componentWillUnmount() {
        this._unListenHistory && this._unListenHistory()
    }

    _onChangeHistory = () => {
        this.props.isOpen && this.props.toggle()
    }

    _handleClosePopup = (e) => {
        e.preventDefault()
        this.props.toggle()
    }

    render() {
        const {productId, isOpen, toggle} = this.props

        return (
            <Modal isOpen={isOpen} toggle={toggle} className="PopupSimilarProducts">
                <ModalBody>
                    <span onClick={this._handleClosePopup} className="Close"><i className="linear-cross"/></span>

                    {
                        isOpen && !!productId &&
                        <SimilarProducts withTitle productId={productId}/>
                    }
                </ModalBody>
            </Modal>
        )
    }
}

PopupSimilarProducts.propTypes = {
    productId: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
}

export default PopupSimilarProducts
