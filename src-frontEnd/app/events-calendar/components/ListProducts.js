import React, {Component} from "react";
import PropTypes from "prop-types";
import ProductItem from "./ProductItem";
import ProductsPlaceholder from "./ProductsPlaceholder";

class ListProducts extends Component {
    render() {
        const {loading, products} = this.props;

        return (
            <div className="ListProducts row">
                {
                    loading ?
                        <ProductsPlaceholder/> :
                        products.map(product => {
                            return (
                                <ProductItem key={product._id} product={product}/>
                            );
                        })
                }
            </div>
        );
    }
}

ListProducts.propTypes = {
    loading: PropTypes.bool,
    products: PropTypes.array
};

export default ListProducts;