import React, {Component} from "react"
import {connect} from "react-redux"
import {getCurrentProductToQuery, isOpenPopupSimilarProducts} from "../selectors"
import {togglePopupSimilarProducts} from "../actions"
import PopupSimilarGgsProducts from "../components/PopupSimilarGgsProducts";

class PopupSimilarGgsProductsContainer extends Component {
    render() {
        const {props} = this

        return <PopupSimilarGgsProducts {...props}/>
    }
}

const mapStateToProps = (state, props) => ({
    productId: getCurrentProductToQuery(state),
    isOpen: isOpenPopupSimilarProducts(state)
})

const mapDispatchToProps = {
    toggle: togglePopupSimilarProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(PopupSimilarGgsProductsContainer)
