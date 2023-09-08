import React, {PureComponent} from "react";
import TableListItemsContainer from "./main/TableListItemsContainer";

class ItemsExplorerMain extends PureComponent {
    render() {
        const {props} = this;
        return (
            <TableListItemsContainer {...props}/>
        );
    }
}

export default ItemsExplorerMain;