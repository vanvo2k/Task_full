import React, {Component} from "react";
import PropTypes from "prop-types";
import ItemsExplorerFooter from "./ItemsExplorerFooter";
import ItemsExplorerMain from "./ItemsExplorerMain";
import ShowItemDetailContainer from "./ShowItemDetailContainer";
import {
    _getCategoryFavoriteDetails,
    _getTotalProductsByCategory,
    _updateCategoryFavorite
} from "../../../services/FavoriteServices";
import ItemsExplorerHeaderContainer from "./ItemsExplorerHeaderContainer"

class FavoriteProducts extends Component {
    state = {
        loading: false,
        total: 0,
        category: {},
        sortByField: ''
    };

    componentDidMount() {
        this._fetchTotalProducts();
        this._triggerFetchProducts();
        this._fetchCategoryDetails();
    }

    _fetchTotalProducts = () => {
        const {categoryId} = this.props;

        _getTotalProductsByCategory(categoryId)
            .then(({success, data}) => {
                if (success) {
                    this.setState({
                        total: data
                    })
                }
            });
    };

    _fetchCategoryDetails = () => {
        const {categoryId} = this.props;

        _getCategoryFavoriteDetails(categoryId)
            .then(({success, data}) => {
                if (success) {
                    if (success) {
                        this.setState({
                            category: data
                        });
                    }
                }
            });
    };

    _triggerFetchProducts = (sortBy = '') => {
        if (!sortBy) {
            if (!this.state.sortByField) sortBy = 'added_date'
            else sortBy = this.state.sortByField
        }
        this.setState({
            loading: true
        });

        const {categoryId} = this.props;

        this.props.fetchProducts(categoryId, sortBy)
            .then(() => {
                this.setState({
                    loading: false
                });
            })
            .catch(error => {
                this.setState({
                    loading: false
                });

                return Promise.reject(error);
            });
    };

    _handleChangeSortByField = (field) => {
        this.setState({
            sortByField: field
        })
    }

    _handleUpdate = (data) => {
        const {title, description} = data;
        const {categoryId} = this.props;

        _updateCategoryFavorite({categoryId, data: {title, description}})
            .then(({success, data}) => {
                if (success) {
                    this.setState({
                        category: data
                    });
                }
            });
    };

    render() {
        const {loading, total, category} = this.state;
        return (
            <div className="FavoriteProducts">
                <div className="container">
                    <ItemsExplorerHeaderContainer triggerSearch={this._triggerFetchProducts}
                                                  onUpdate={this._handleUpdate} category={category} total={total}
                                                  changeField={this._handleChangeSortByField}
                    />
                    <ItemsExplorerMain loading={loading} triggerSearch={this._triggerFetchProducts}/>
                    <ItemsExplorerFooter triggerSearch={this._triggerFetchProducts}/>
                    <ShowItemDetailContainer triggerSearch={this._triggerFetchProducts}/>
                </div>
            </div>
        );
    }
}

FavoriteProducts.propTypes = {
    categoryId: PropTypes.string.isRequired,
    fetchProducts: PropTypes.func.isRequired,
};

export default FavoriteProducts;