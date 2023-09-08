import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import ListItems from "./ListItems";
import Loading from "../../../../shared-components/Loading";
import TableHead from "../../../search/components/main/TableHead";

class TableListItems extends Component {

    render() {
        const {props} = this;
        const {className, layout, loading} = props;
        const {items} = props;

        return (
            <div className={classNames('TableListItems', className)}>
                <Loading loading={loading}/>

                <ul className={classNames("TableItemsWrapper", layout, layout === 'grid' ? 'row' : 'd-table')}>
                    <TableHead layout={layout}/>

                    <ListItems loading={loading} items={items}/>
                </ul>
            </div>
        );
    }
}

TableListItems.propTypes = {
    items: PropTypes.object.isRequired
};

export default TableListItems;