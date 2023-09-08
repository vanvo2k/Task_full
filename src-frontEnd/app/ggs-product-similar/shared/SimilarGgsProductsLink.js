import React, {Component} from "react"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {requestOpenSimilarProducts} from "../actions"
import CanUseFeatureContainer from "../../../shared-containers/CanUseFeatureContainer"

class SimilarGgsProductsLink extends Component {
    _handleClickShowSimilarProducts = (e) => {
        e.preventDefault()

        const {requestOpenSimilarProducts, productId} = this.props
        requestOpenSimilarProducts && requestOpenSimilarProducts(productId)
    }

    render() {
        const {requestOpenSimilarProducts} = this.props

        return (
            <CanUseFeatureContainer feature="access-beta" alternatively="admin" noAlert>
                {
                    requestOpenSimilarProducts &&
                    <a className="SimilarProductsLink" onClick={this._handleClickShowSimilarProducts}><i
                        className="linear-magnifier"/></a>

                }
            </CanUseFeatureContainer>
        )
    }
}

SimilarGgsProductsLink.propTypes = {
    productId: PropTypes.string.isRequired,
    requestOpenSimilarProducts: PropTypes.func,
}


const mapDispatchToProps = {
    requestOpenSimilarProducts
}

export default connect(null, mapDispatchToProps)(SimilarGgsProductsLink)
