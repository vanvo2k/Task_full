import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import ListItems from "./ListItems";
import Loading from "../../../../shared-components/Loading";

class TableListItems extends Component {
    render() {
        const {props} = this;
        const {className, layout, loading, items, triggerSearch, mode} = props;

        return (
            <div className={classNames('TableListItems', className)}>
                <Loading loading={loading}/>

                <ul className={classNames("TableItemsWrapper", layout, layout === 'grid' ? 'row' : 'd-table')}>
                    <ListItems loading={loading} items={items} triggerSearch={triggerSearch} mode={mode}/>
                </ul>
            </div>
        );
    }
}

TableListItems.propTypes = {
    items: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
};

export default TableListItems;