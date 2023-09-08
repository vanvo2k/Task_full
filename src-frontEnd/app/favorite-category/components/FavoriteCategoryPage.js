import React, {Component} from "react";
import PropTypes from "prop-types";
import {_getListCategoriesFavorite} from "../../../services/FavoriteServices";
import ListFavoriteCategories from "./ListFavoriteCategories";

class FavoriteCategoryPage extends Component {
    state = {
        categories: [],
        loading: false
    };

    _request = null;

    componentDidMount() {
        this._fetchListCategories();
    }

    componentWillUnmount() {
        this._request && this._request.cancel && this._request.cancel();
    }

    _fetchListCategories = () => {
        this._request = _getListCategoriesFavorite({});

        this.setState({
            loading: true
        });

        this._request
            .then(response => {
                const {success, data} = response;
                const updateState = {
                    loading: false
                };

                if (success) {
                    updateState.categories = data;
                }

                this.setState(updateState);
            })
            .catch(error => {
                this.setState({
                    loading: false
                });
            });
    };

    _handleRefreshPage = ()=>{
        this._fetchListCategories();
    }

    render() {
        const {categories, loading} = this.state;

        return (
            <ListFavoriteCategories loading={loading} categories={categories} onRefreshPage = {this._handleRefreshPage}/>
        );
    }
}

FavoriteCategoryPage.propTypes = {
    history: PropTypes.object.isRequired,
};

export default FavoriteCategoryPage;