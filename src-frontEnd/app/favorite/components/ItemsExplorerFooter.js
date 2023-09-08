import React, {Component} from "react";
import ControlShowItemsContainer from "./footer/ControlShowItemsContainer";

class ItemsExplorerFooter extends Component {
    render() {
        const {props} = this;

        return (
            <ControlShowItemsContainer {...props}/>
        )
    }
}

export default ItemsExplorerFooter;