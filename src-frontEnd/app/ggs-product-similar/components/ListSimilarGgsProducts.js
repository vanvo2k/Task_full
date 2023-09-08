import React, {Component} from "react"
import PropTypes from "prop-types"
import {fromJS} from "immutable"
import getHistory from "../../../store/getHistory"
import NoSimilarGgsProduct from "./NoSimilarGgsProduct";
import GgsProductGrid from "../../ggs-product/components/main/GgsProductGrid";

class ListSimilarGgsProducts extends Component {
    _onClickShowItemDetail = ({id}) => {
        if (!id) {
            return
        }

        const history = getHistory()
        history.push(`/a/ggs-products/${id}`)
    }

    render() {
        const {products, loading} = this.props

        return (
            <div className="ListSimilarProducts">
                {
                    !loading && (!products || !products.length) &&
                    <NoSimilarGgsProduct/>
                }

                <ul className="row">
                    {
                        products.map((product, index) => {
                            const productId = product._id

                            const props = {
                                item: fromJS(product),
                                id: productId,
                                index,
                            }

                            return <GgsProductGrid showItemDetail={this._onClickShowItemDetail} key={productId} {...props}/>
                        })
                    }
                </ul>
            </div>
        )
    }
}

ListSimilarGgsProducts.propTypes = {
    loading: PropTypes.bool.isRequired,
    products: PropTypes.array.isRequired,
}

export default ListSimilarGgsProducts
