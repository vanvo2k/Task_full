import React, {Component} from "react"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {requestOpenSimilarProducts} from "../actions"
import CanUseFeatureContainer from "../../../shared-containers/CanUseFeatureContainer"

class SimilarProductsLink extends Component {
    _handleClickShowSimilarProducts = (e) => {
        e.preventDefault()
        if(this.props.isUserTrial && !this.props.isUserTrialCanSee){
            this.props.onUpgradePopup()
        }else{
        const {requestOpenSimilarProducts, productId} = this.props
        requestOpenSimilarProducts && requestOpenSimilarProducts(productId)
    }}

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

SimilarProductsLink.propTypes = {
    productId: PropTypes.string.isRequired,
    requestOpenSimilarProducts: PropTypes.func,
}


const mapDispatchToProps = {
    requestOpenSimilarProducts
}

export default connect(null, mapDispatchToProps)(SimilarProductsLink)
