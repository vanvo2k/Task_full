import React, {Component} from "react";
import TableListItemsContainer from "./main/TableListItemsContainer";

class ItemsExplorerMain extends Component {
    render() {
        const {props} = this;

        return (
            <TableListItemsContainer {...props}/>
        )
    }
}

export default ItemsExplorerMain;