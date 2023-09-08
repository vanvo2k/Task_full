import React, {Component} from "react";
import PropTypes from "prop-types";
import ProductPlaceholder from "./ProductPlaceholder";

class ProductsPlaceholder extends Component {
    render() {
        const {limit} = this.props;
        const arr = [];
        for (let i = 0; i < limit; i++) {
            arr.push(i);
        }

        return arr.map((i) => {
            return (
                <ProductPlaceholder key={i}/>
            );
        });
    }
}

ProductsPlaceholder.propTypes = {
    limit: PropTypes.number
};

ProductsPlaceholder.defaultProps = {
    limit: 4
};

export default ProductsPlaceholder;