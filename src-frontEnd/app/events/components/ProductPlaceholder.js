import React, {Component} from "react";

class ProductPlaceholder extends Component {
    render() {
        return (
            <div className="ProductPlaceholder col-lg-3 col-sm-6 col-6">
                <div className="PreloadBox">
                    <div className="Thumbnail Item"/>
                    <div className="Rank Item"/>
                    <div className="Name Item"/>
                    <div className="Meta Item"/>
                </div>
            </div>
        );
    }
}


export default ProductPlaceholder;