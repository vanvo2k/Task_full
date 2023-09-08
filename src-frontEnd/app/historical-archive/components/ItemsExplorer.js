import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import ItemsExplorerFooter from "./ItemsExplorerFooter";
import ItemsExplorerMain from "./ItemsExplorerMain";
import ShowItemDetailContainer from "./ShowItemDetailContainer";
import ItemsExplorerHeaderContainer from "./header/ItemsExplorerHeaderContainer";

class ItemsExplorer extends PureComponent {
    render() {
        const {fetchItems, className} = this.props;

        return (
            <div id="SearchItemsPage" className={classNames("SearchItemsPage", className)}>
                <ItemsExplorerHeaderContainer triggerSearch={fetchItems}/>
                <ItemsExplorerMain/>
                <ItemsExplorerFooter triggerSearch={fetchItems}/>
                <ShowItemDetailContainer triggerSearch={fetchItems}/>
            </div>
        );
    }
}

ItemsExplorer.propTypes = {
    receiveProducts: PropTypes.func.isRequired,
    fetchItems: PropTypes.func.isRequired
};

export default ItemsExplorer;