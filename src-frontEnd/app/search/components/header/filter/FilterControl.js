import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import FilterRankContainer from "./FilterRankContainer";
import FilterTimeAvailableContainer from "./FilterTimeAvailableContainer";
import FilterTypeContainer from "./FilterTypeContainer";
import FilterStatusContainer from "./FilterStatusContainer";
import FilterPriceContainer from "./FilterPriceContainer";
import FilterBrandTypeContainer from "./FilterBrandTypeContainer";
import FilterMarketContainer from "./FilterMarketContainer";

class FilterControl extends PureComponent {
    render() {
        const {triggerSearch,onUpgradePopup} = this.props;

        return (
            <div className={"FilterControl"}>
                <FilterMarketContainer triggerSearch={triggerSearch}/>
                <FilterRankContainer triggerSearch={triggerSearch} onUpgradePopup={onUpgradePopup} />
                <FilterTimeAvailableContainer triggerSearch={triggerSearch}/>
                <FilterBrandTypeContainer triggerSearch={triggerSearch}/>
                <FilterTypeContainer triggerSearch={triggerSearch}/>
                <FilterPriceContainer triggerSearch={triggerSearch}/>
                <FilterStatusContainer triggerSearch={triggerSearch}/>
            </div>
        );
    }
}

FilterControl.propTypes = {
    triggerSearch: PropTypes.func.isRequired
};

export default FilterControl;