import React, {Component} from "react";
import PropTypes from "prop-types";
import ProductsPlaceholder from "./ProductsPlaceholder";

class EventItemPlaceholder extends Component {
    render() {
        return (
            <div className="EventItemPlaceholder">
                <div className="Wrapper row">
                    <div className="Details text-center col-12 col-sm-6 col-lg-4">
                        <div className="WrapperDetails d-flex flex-column justify-content-between">
                            <div className="PreloadBox">
                                <div className="FeaturedImage Item"/>
                            </div>
                        </div>
                    </div>
                    <div className="Products col-12 col-sm-6 col-lg-8">
                        <div className="row">
                            <ProductsPlaceholder/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

EventItemPlaceholder.propTypes = {
    any: PropTypes.any
};

export default EventItemPlaceholder;