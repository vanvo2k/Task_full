import React, {PureComponent} from "react";
import ControlShowItemsContainer from "./footer/ControlShowItemsContainer";

class ItemsExplorerFooter extends PureComponent {
    render() {
        const {props} = this;

        return (
            <ControlShowItemsContainer {...props}/>
        )
    }
}

export default ItemsExplorerFooter;