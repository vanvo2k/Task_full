import React, {PureComponent} from "react";
import ControlShowItemsContainer from "./footer/ControlShowItemsContainer";

class GgsProductsFooter extends PureComponent {
    render() {
        const {props} = this;

        return (
            <ControlShowItemsContainer {...props}/>
        )
    }
}

export default GgsProductsFooter;