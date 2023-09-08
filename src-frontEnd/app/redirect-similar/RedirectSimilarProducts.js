import React, {Component} from "react";
import PropTypes from "prop-types";
import SimilarProducts from "../similar-products/shared/SimilarProducts";

class RedirectSimilarProducts extends Component {
    render() {
        const {match} = this.props;
        const {params} = match;
        const {productId} = params;

        return (
            <div className="RedirectSimilarProducts">
                <div className="container">
                    <SimilarProducts productId={productId}/>
                </div>
            </div>
        );
    }
}

RedirectSimilarProducts.propTypes = {
    history: PropTypes.object.isRequired,
};

export default RedirectSimilarProducts;