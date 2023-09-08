import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button} from "reactstrap";
import {Link} from "react-router-dom";
import FeaturedItem from "./FeaturedItem";
import {FormattedMessage} from "react-intl";

class ItemsTopRanking extends Component {
    componentDidMount() {
        this.props.fetchItemsTopRanking();
    }

    render() {
        const {items} = this.props;

        return (
            <div className="ItemsTopRanking FeaturedItems card">
                <div className="Title card-header">
                    <FormattedMessage id="statistic.top_10_bsr"/>
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
                            to='/a/items?page=1&sortByField=rank'
                            tag={Link}>
                        <FormattedMessage id="statistic.see_more"/>
                    </Button>
                </div>
            </div>
        );
    }
}

ItemsTopRanking.propTypes = {
    items: PropTypes.object.isRequired,
    fetchItemsTopRanking: PropTypes.func.isRequired
};

export default ItemsTopRanking;