import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import FilterRankContainer from "./FilterRankContainer";
import FilterTimeAvailableContainer from "./FilterTimeAvailableContainer";
import FilterTypeContainer from "./FilterTypeContainer";
import FilterStatusContainer from "./FilterStatusContainer";
import FilterBrandTypeContainer from "./FilterBrandTypeContainer";
import FilterMarketContainer from "./FilterMarketContainer";
import FilterMinPriceContainer from "./FilterMinPriceContainer";
import FilterMaxPriceContainer from "./FilterMaxPriceContainer";

class FilterControl extends PureComponent {
    render() {
        const {triggerSearch} = this.props;

        return (
            <div className={"FilterControl"}>
                <FilterMarketContainer triggerSearch={triggerSearch}/>
                <FilterRankContainer triggerSearch={triggerSearch}/>
                <FilterMinPriceContainer triggerSearch={triggerSearch}/>
                <FilterMaxPriceContainer triggerSearch={triggerSearch}/>
                <FilterStatusContainer triggerSearch={triggerSearch}/>
            </div>
        );
    }
}

FilterControl.propTypes = {
    triggerSearch: PropTypes.func.isRequired
};

export default FilterControl;