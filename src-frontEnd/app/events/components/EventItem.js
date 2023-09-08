import React, {Component} from "react";
import PropTypes from "prop-types";
import ListProducts from "./ListProducts";
import classNames from "classnames";
import {_getProducts} from "../../../services/EventServices";
import EventActions from "./EventActions";
import EventDetails from "./EventDetails";

class EventItem extends Component {
    state = {
        products: [],
        loading: true,
        showDetails: false
    };

    componentDidMount() {
        this._fetchProducts();
    }

    _fetchProducts = () => {
        const {event} = this.props;
        const {query} = event;

        this.setState({
            loading: true
        });

        _getProducts({query})
            .then(result => {
                const {success, data} = result;

                if (success) {
                    const {docs} = data;

                    this.setState({
                        products: docs,
                        loading: false
                    });
                } else {
                    this.setState({
                        loading: false
                    });
                }
            })
            .catch(() => {
                this.setState({
                    loading: false
                });
            });
    };

    _handleOnUpdateProduct = ({id, updated}) => {
        this.setState(({products}) => ({
            products: products.map(product => {
                if (product._id !== id) {
                    return product;
                }

                return {
                    ...product,
                    ...updated
                };
            })
        }));
    };

    _handleToggleShowDetail = () => {
        this.setState(({showDetails}) => ({
            showDetails: !showDetails
        }));
    };

    render() {
        const {products, loading, showDetails} = this.state;
        const {event} = this.props;
        const {name, thumbnail, status} = event;

        return (
            <div className={classNames("EventItem", status, {showDetails})}>
                <div className="Wrapper row">
                    <div className="col-12 col-sm-6 col-lg-4">
                        <div className={classNames("Details FlipContainer text-center", {open: showDetails})}>
                            <div className="Flipper">
                                <div className="Preview Front d-flex flex-column justify-content-between"
                                     style={{backgroundImage: 'url(' + thumbnail + ')'}}>
                                    <div className="Name d-flex justify-content-center align-items-center">
                                        {name}
                                    </div>

                                    <EventActions
                                        onShowDetail={this._handleToggleShowDetail}
                                        event={event}/>
                                </div>
                                <EventDetails
                                    onCloseDetail={this._handleToggleShowDetail}
                                    event={event} className="Back"/>
                            </div>
                        </div>
                    </div>
                    <div className="Products col-12 col-sm-6 col-lg-8">
                        <ListProducts onUpdateProduct={this._handleOnUpdateProduct}
                                      loading={loading}
                                      products={products}/>
                    </div>
                </div>


            </div>
        );
    }
}

EventItem.propTypes = {
    event: PropTypes.object
};

export default EventItem;