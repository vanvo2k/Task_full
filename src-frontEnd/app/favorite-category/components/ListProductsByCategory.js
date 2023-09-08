import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {_getProductsByCategory} from "../../../services/FavoriteServices";

class ListProductsByCategory extends Component {
    state = {
        products: [],
        images: [0, 1, 2, 3]
    };

    componentDidMount() {
        this._fetchProducts();
    }

    _fetchProducts = () => {
        const {categoryId} = this.props;
        _getProductsByCategory({categoryId, limit: 4})
            .then(({data, success}) => {
                if (success) {
                    const {docs} = data;

                    this.setState({
                        products: docs
                    })
                }
            });
    };

    render() {
        const {images, products} = this.state;

        return (
            <div className="ListProductsByCategory">
                {
                    images.map((i, index) => {
                        const product = products[index] || false;
                        const preview = product ? product.preview : '';
                        const isCropped = product ? product.cropped : false;
                        const category = product.category || 'clothing';

                        const styles = {};
                        if (preview) {
                            styles.backgroundImage = `url("${preview}")`;
                        }

                        return (
                            <div style={{width: `${100 / images.length}%`}} key={index}
                                 className={classNames("Product", `c-${category}`, {isCropped}, {noBackground: !preview})}>
                                <div style={styles}
                                     className="Preview">
                                    {
                                        !!preview &&
                                        <img src={preview} alt={preview}/>
                                    }
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

ListProductsByCategory.propTypes = {
    categoryId: PropTypes.string.isRequired
};

export default ListProductsByCategory;