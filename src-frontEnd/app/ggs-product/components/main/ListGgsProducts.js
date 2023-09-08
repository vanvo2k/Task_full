import React, {Component} from "react";
import PropTypes from "prop-types";
import NoGgsProducts from "./NoGgsProducts";
import GgsProductTableContainer from "./GgsProductTableContainer";

class ListGgsProducts extends Component {
    render() {
        const {items, loading, error} = this.props;

        return !items.size ? <NoGgsProducts error={error} loading={loading}/> : this._renderListGgsProducts();
    }

    _renderListGgsProducts() {
        const {items} = this.props;

        return items
            .filter(id => {
                return !!id;
            })
            .map((id, index) => {
                return (
                    <GgsProductTableContainer
                        key={id}
                        index={index}
                        id={id}/>
                );
            });
    }
}

ListGgsProducts.propTypes = {
    items: PropTypes.object.isRequired,
    loading: PropTypes.bool,
    error: PropTypes.string,
};

export default ListGgsProducts;