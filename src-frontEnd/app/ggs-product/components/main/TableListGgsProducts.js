import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import TableHead from "./TableHead";
import Loading from "../../../../shared-components/Loading";
import ListGgsProducts from "./ListGgsProducts";

class TableListGgsProducts extends Component {
    render() {
        const {props} = this;
        const {className, loading} = props;
        const {items, layout, error} = props;

        return (
            <div className={classNames('TableListItems Fade', layout, className, {Loading: loading})}>
                <div className="container">
                    <Loading loading={loading}/>
                    <ul className={classNames("TableItemsWrapper",layout, layout === 'grid' ? 'row' : 'd-table')}>
                        <TableHead layout={layout}/>

                        <ListGgsProducts error={error} loading={loading} items={items}/>
                    </ul>
                </div>
            </div>
        );
    }
}

TableListGgsProducts.propTypes = {
    items: PropTypes.object.isRequired,
    loading: PropTypes.bool,
    layout: PropTypes.string,
    error: PropTypes.string,
};

export default TableListGgsProducts;