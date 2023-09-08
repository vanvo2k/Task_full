import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import ListItems from "./ListItems";
import TableHead from "./TableHead";
import Loading from "../../../../shared-components/Loading";

class TableListItems extends Component {
    render() {
        const {props} = this;
        const {className, loading} = props;
        const {items, layout, error, historicalDate} = props;

        return (
            <div className={classNames('TableListItems Fade', layout, className, {Loading: loading})}>
                <div className="container">
                    <Loading loading={loading}/>
                    <ul className={classNames("TableItemsWrapper",layout, layout === 'grid' ? 'row' : 'd-table')}>
                        <TableHead layout={layout}/>

                        <ListItems error={error} loading={loading} items={items} historicalDate={historicalDate}/>
                    </ul>
                </div>
            </div>
        );
    }
}

TableListItems.propTypes = {
    items: PropTypes.object.isRequired,
    loading: PropTypes.bool,
    layout: PropTypes.string,
    error: PropTypes.string,
};

export default TableListItems;