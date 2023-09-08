import React, {Component} from "react";
import PropTypes from "prop-types";
import ProductImagePreview from "../../../shared-components/ProductImagePreview";
import Loading from "../../../shared-components/Loading";

class ProductPreview extends Component {
    render() {
        const {loading, product} = this.props;
        const {cropped, preview, name} = product;

        return (
            <div className="ProductPreview col-12 col-md-6">
                <div className="Wrapper">
                    <Loading loading={loading}/>

                    {
                        !!preview &&
                        <ProductImagePreview name={name} disableLink cropped={cropped} image={preview}/>
                    }

                    <div className="Name">{name}</div>
                </div>
            </div>
        );
    }
}

ProductPreview.defaultProps = {
    product: {}
};

ProductPreview.propTypes = {
    product: PropTypes.object,
    loading: PropTypes.bool
};

export default ProductPreview;