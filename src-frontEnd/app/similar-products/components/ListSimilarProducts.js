import React, {Component} from "react"
import PropTypes from "prop-types"
import {fromJS} from "immutable"
import ItemGrid from "../../search/components/main/ItemGrid"
import NoSimilarProduct from "./NoSimilarProduct"
import getHistory from "../../../store/getHistory"
import { randomArrForTrial } from "../../../helpers/common/randomArrForTrial"

class ListSimilarProducts extends Component {
    _onClickShowItemDetail = ({id}) => {
        if (!id) {
            return
        }

        const history = getHistory()
        history.push(`/a/items/${id}`)
    }

    render() {
        const {products, loading} = this.props
        const randomArr = randomArrForTrial(products,"products")
        return (
            <div className="ListSimilarProducts">
                {
                    !loading && (!products || !products.length) &&
                    <NoSimilarProduct/>
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

                            return <ItemGrid showItemDetail={this._onClickShowItemDetail} key={productId} randomArr={randomArr} {...props}/>
                        })
                    }
                </ul>
            </div>
        )
    }
}

ListSimilarProducts.propTypes = {
    loading: PropTypes.bool.isRequired,
    products: PropTypes.array.isRequired,
}

export default ListSimilarProducts
