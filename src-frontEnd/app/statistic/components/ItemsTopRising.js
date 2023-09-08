import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button} from "reactstrap";
import {Link} from "react-router-dom";
import FeaturedItem from "./FeaturedItem";
import {FormattedMessage} from "react-intl";

class ItemsTopRising extends Component {
    componentDidMount() {
        this.props.fetchItemsTopRising();
    }

    render() {
        const {items} = this.props;

        return (
            <div className="ItemsTopRising FeaturedItems card">
                <div className="Title card-header">
                    <FormattedMessage id="statistic.top_10_rising"/>
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

ItemsTopRising.propTypes = {
    items: PropTypes.object.isRequired,
    fetchItemsTopRising: PropTypes.func.isRequired
};

export default ItemsTopRising;