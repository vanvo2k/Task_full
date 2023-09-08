import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import ListCategoryFavorites from "./ListCategoryFavorites";
import {
    _createCategoryFavorite,
    _deleteCategoryFavorite,
    _getListCategoriesFavorite, _toggleProductFavorite
} from "../../../services/FavoriteServices";
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import ProductPreview from "./ProductPreview";
import {_getProductDetail} from "../../../services/ProductServices";
import {FormattedMessage} from "react-intl";

class AddToFavorites extends Component {
    state = {
        term: '',
        categories: [],
        product: {},
        loadingProduct: false,
        loadingCategories: false
    };

    componentDidUpdate(prevProps, prevState) {
        const {isOpen, productId} = this.props;
        const {term} = this.state;

        if (!isOpen) {
            return;
        }

        if (productId !== prevProps.productId) {
            this._fetchProductDetails();

            return this._fetchListCategories();
        }

        if (prevState.term !== term) {
            return this._fetchListCategories();
        }
    }

    _fetchProductDetails = () => {
        const {productId} = this.props;

        this.setState({
            loadingProduct: true
        });

        _getProductDetail(productId)
            .then(({success, data}) => {
                const updateState = {
                    loadingProduct: false
                };

                if (success) {
                    updateState.product = data;
                }

                this.setState(updateState);
            })
            .catch(error => {
                this.setState({
                    loadingProduct: false
                });
            });
    };

    _fetchListCategories() {
        const {productId} = this.props;
        const {term} = this.state;

        if (!productId) {
            return;
        }

        this.setState({
            loadingCategories: true
        });

        _getListCategoriesFavorite({productId, term})
            .then(response => {
                const {data, success} = response;

                const updateState = {
                    loadingCategories: false
                };

                if (success) {
                    updateState.categories = data;
                }

                this.setState(updateState);
            })
            .catch(error => {
                this.setState({
                    loadingCategories: false
                });
            });
    }

    _handleClosePopup = (e) => {
        e.preventDefault();

        this.setState({
            term: ''
        });

        this.props.closePopup();
    };

    _handleToggleModal = (e) => {
        this.setState({
            term: ''
        });

        this.props.closePopup();
    };

    _handleChangeSearchTerm = (term = '') => {
        this.setState({
            term
        });
    };

    _onCreateCategory = (title) => {
        const {productId} = this.props;

        _createCategoryFavorite(title, productId)
            .then(response => {
                const {data, success} = response;

                if (success) {
                    this.setState(({categories}) => ({
                        categories: [].concat([data], categories),
                        term: ''
                    }));
                }
            });
    };

    _handleDeleteCategory = (categoryId) => {
        _deleteCategoryFavorite(categoryId)
            .then(({success}) => {
                if (success) {
                    this.setState(({categories}) => ({
                        categories: categories.filter(category => category._id !== categoryId)
                    }));
                }
            });
    };

    _handleToggleFavorite = (categoryId) => {
        const {productId} = this.props;

        this.setState(({categories}) => ({
            categories: categories.map(category => {
                if (category._id !== categoryId) {
                    return category;
                }

                return {
                    ...category,
                    added: !category.added
                };
            })
        }));

        _toggleProductFavorite({productId, categoryId});
    };

    render() {
        const {isOpen} = this.props;
        const {categories, product, loadingCategories, loadingProduct} = this.state;

        return (
            <div className={classNames("AddToFavorites", {isOpen})}>
                <Modal size="lg" className="ModalAddToFavorites" toggle={this._handleToggleModal} isOpen={isOpen}>
                    <ModalHeader>
                        <span><FormattedMessage id="favorite.modal.title"/></span>
                        <span onClick={this._handleClosePopup} className="Close"><i className="linear-cross"/></span>
                    </ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <ProductPreview loading={loadingProduct} product={product}/>
                            <ListCategoryFavorites
                                loading={loadingCategories}
                                onToggle={this._handleToggleFavorite}
                                onRemove={this._handleDeleteCategory}
                                onCreate={this._onCreateCategory}
                                onChangeTerm={this._handleChangeSearchTerm}
                                categories={categories}/>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

AddToFavorites.propTypes = {
    productId: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    closePopup: PropTypes.func.isRequired,
};

export default AddToFavorites;