import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import AnalyticsKeywordContainer from "./analytics/AnalyticsKeywordContainer"
import GgsProductsHeaderContainer from "./header/GgsProductsHeaderContainer";
import GgsProductsMain from "./GgsProductsMain";
import GgsProductsFooter from "./GgsProductsFooter";
import ShowGgsProductDetailContainer from "./ShowGgsProductDetailContainer";
import SearchGgsProductsTour from "./SearchGgsProductsTour";

class GgsProducts extends PureComponent {
    componentDidMount() {
        this.props.fetchTotalItems();
    }

    render() {
        const {fetchItems, className} = this.props;

        return (
            <div id="SearchItemsPage" className={classNames("SearchItemsPage", className)}>
                <GgsProductsHeaderContainer triggerSearch={fetchItems}/>
                {/*<AnalyticsKeywordContainer/>*/}
                <GgsProductsMain/>
                <GgsProductsFooter triggerSearch={fetchItems}/>
                <ShowGgsProductDetailContainer triggerSearch={fetchItems}/>
                <SearchGgsProductsTour/>
            </div>
        );
    }
}

GgsProducts.propTypes = {
    receiveProducts: PropTypes.func.isRequired,
    fetchItems: PropTypes.func.isRequired,
    fetchTotalItems: PropTypes.func.isRequired,
};

export default GgsProducts;