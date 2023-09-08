import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button} from "reactstrap";
import {Link} from "react-router-dom";
import FeaturedItem from "./FeaturedItem";
import classNames from "classnames";
import {FormattedMessage} from "react-intl";

class ItemsRandom extends Component {
    state = {
        loading: false
    };

    componentDidMount() {
        this.props.fetchItemsRandom();
    }

    _handleClickReload(e) {
        e.preventDefault();

        const {loading} = this.state;
        if (loading) {
            return;
        }

        this.setState({
            loading: true
        });

        this.props.fetchItemsRandom()
            .then(() => {
                this.setState({
                    loading: false
                });
            })
            .catch(() => {
                this.setState({
                    loading: false
                });
            });
    }

    render() {
        const {items} = this.props;
        const {loading} = this.state;

        return (
            <div className={classNames("ItemsRandom FeaturedItems card", {loading})}>
                <div className="Title card-header">
                    <FormattedMessage id="statistic.random_products"/>

                    <span className="Reload d-flex align-items-center" onClick={this._handleClickReload.bind(this)}>
                        <i className="Icon linear-sync2"/>
                    </span>
                </div>

                <div className="Items card-body">
                    {
                        items.map((item, index) => {
                            return (
                                <FeaturedItem
                                    key={item.get('_id')}
                                    item={item}
                                    index={index}/>
                            );
                        })
                    }
                </div>
                <div className="More">
                    <Button color="primay"
                            to='/a/items?from=1&page=1&to=100000&sortByField=trending'
                            tag={Link}>
                        <FormattedMessage id="statistic.see_more"/>
                    </Button>
                </div>
            </div>
        );
    }
}

ItemsRandom.propTypes = {
    items: PropTypes.object.isRequired,
    fetchItemsRandom: PropTypes.func.isRequired
};

export default ItemsRandom;