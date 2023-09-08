import React, {Component} from "react";
import PropTypes from "prop-types";
import ProductItem from "./ProductItem";
import ProductsPlaceholder from "./ProductsPlaceholder";

class ListProducts extends Component {
    render() {
        const {products, onUpdateProduct, loading} = this.props;

        return (
            <div className="ListProducts row">
                {
                    loading ?
                        <ProductsPlaceholder/> :
                        products.map(product => {
                            return (
                                <ProductItem onUpdate={onUpdateProduct} key={product._id} product={product}/>
                            );
                        })
                }
            </div>
        );
    }
}

ListProducts.propTypes = {
    loading: PropTypes.bool,
    products: PropTypes.array,
    onUpdateProduct: PropTypes.func,
};

export default ListProducts;