import React, {Component} from "react";
// import FavoriteProducts from "./FavoriteProducts";
import EnsureLoggedInContainer from "../../../shared-containers/EnsureLoggedInContainer";
import DocTitle from "../../../shared-components/DocTitle";
import TableListItemsContainer from "../components/main/TableListItemsContainer";
import ControlShowItemsContainer from "./footer/ControlShowItemsContainer";
import ShowItemDetailContainer from "./ShowItemDetailContainer";
import ItemsExplorerHeaderContainer from "./ItemsExplorerHeaderContainer"

import {_getProductsIgnore, _getTotalIgnoreItems} from "../../../services/FavoriteServices";

class IgnorePostPage extends Component {
    state = {
        loading: false,
        total: 0,
        category: {},
        sortByField: '',
        mode: 'ignore'
    };

    componentDidMount() {
        this._triggerFetchProducts();
    }

    _fetchTotalProducts = () => {
        _getTotalIgnoreItems()
            .then(({success, total}) => {
                if (success) {
                    this.setState({
                        total: total
                    })
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

        this.props.fetchProducts(sortBy)
            .then(() => {
                this.setState({
                    loading: false
                });
                this._fetchTotalProducts();
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

    render() {
        const {loading, mode, total} = this.state;

        return (
                <div className="FavoriteProducts">
                    <div className="container">
                        <ItemsExplorerHeaderContainer triggerSearch={this._triggerFetchProducts} total={total}
                            changeField={this._handleChangeSortByField}
                        />
                        <TableListItemsContainer loading={loading} triggerSearch={this._triggerFetchProducts} mode={mode}/>
                        <ControlShowItemsContainer triggerSearch={this._triggerFetchProducts}/>
                        <ShowItemDetailContainer triggerSearch={this._triggerFetchProducts}/>
                    </div>
                </div>
        );
    }
}

export default IgnorePostPage