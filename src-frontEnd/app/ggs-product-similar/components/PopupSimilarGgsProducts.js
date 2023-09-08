import React, {Component} from "react"
import PropTypes from "prop-types"
import {Modal, ModalBody} from "reactstrap"
import getHistory from "../../../store/getHistory"
import SimilarGgsProducts from "../shared/SimilarGgsProducts";

class PopupSimilarGgsProducts extends Component {
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
                        <SimilarGgsProducts withTitle productId={productId}/>
                    }
                </ModalBody>
            </Modal>
        )
    }
}

PopupSimilarGgsProducts.propTypes = {
    productId: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
}

export default PopupSimilarGgsProducts
