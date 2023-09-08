import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import ItemsExplorerFooter from "./ItemsExplorerFooter";
import ItemsExplorerMain from "./ItemsExplorerMain";
import ShowItemDetailContainer from "./ShowItemDetailContainer";
import ItemsExplorerHeaderContainer from "./header/ItemsExplorerHeaderContainer";
import AnalyticsKeywordContainer from "./analytics/AnalyticsKeywordContainer"
import SearchProductsTour from "./SearchProductsTour"
import UpgradePopup from "../../../shared-components/UpgradePopup";

class ItemsExplorer extends PureComponent {
    componentDidMount() {
        this.props.fetchTotalItems();
    }

    render() {
        const {fetchItems, className, itemData,toggleUpgradePopup} = this.props;

        return (
            <div id="SearchItemsPage" className={itemData.get("isOpenUpgradePopup")?classNames("SearchItemsPage Active", className):classNames("SearchItemsPage", className)}>
                <ItemsExplorerHeaderContainer triggerSearch={fetchItems} onUpgradePopup={toggleUpgradePopup}/>
                <AnalyticsKeywordContainer/>
                <ItemsExplorerMain triggerSearch={fetchItems} onUpgradePopup={toggleUpgradePopup}/>
                <ItemsExplorerFooter triggerSearch={fetchItems}/>
                <ShowItemDetailContainer triggerSearch={fetchItems}/>
                <SearchProductsTour/>
                <UpgradePopup isOpenUpgradePopup={itemData.get("isOpenUpgradePopup")} onUpgradePopup={toggleUpgradePopup}/>
            </div>
        );
    }
}

ItemsExplorer.propTypes = {
    receiveProducts: PropTypes.func.isRequired,
    fetchItems: PropTypes.func.isRequired,
    fetchTotalItems: PropTypes.func.isRequired,
};

export default ItemsExplorer;