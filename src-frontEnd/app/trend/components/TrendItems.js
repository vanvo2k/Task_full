import React, {Component} from "react";
import PropTypes from "prop-types";
import ItemsExplorerMain from "./ItemsExplorerMain";
import ShowItemDetailContainer from "./ShowItemDetailContainer";
import SwitchLayoutContainer from "../../search/components/header/sort/SwitchLayoutContainer";
import {FormattedMessage} from "react-intl";
import ControlShowItemsContainer from "./footer/ControlShowItemsContainer";


class TrendItems extends Component {
    state = {
        loading: false
    };

    constructor(props) {
        super(props);

        this._triggerFetchItems = this._triggerFetchItems.bind(this);
    }

    componentDidMount() {
        this._triggerFetchItems();
    }

    render() {
        const {loading} = this.state;

        return (
            <div className="TrendItems">
                <div className="container">
                    <div className="Header d-flex align-items-center">
                        <h1 className="PageTitle"><FormattedMessage id="general.trending_products_title"/></h1>
                        <div className="ml-auto">
                            <SwitchLayoutContainer/>
                        </div>
                    </div>
                    <ItemsExplorerMain loading={loading}/>

                    <ControlShowItemsContainer triggerSearch={this._triggerFetchItems}/>

                    <ShowItemDetailContainer triggerSearch={this._triggerFetchItems}/>
                </div>
            </div>
        )
    }

    _triggerFetchItems() {
        this.setState({
            loading: true
        });

        this.props.fetchItems()
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
    }
}

TrendItems.propTypes = {
    fetchItems: PropTypes.func.isRequired,
    fetchTotalItems: PropTypes.func.isRequired,
};

export default TrendItems;