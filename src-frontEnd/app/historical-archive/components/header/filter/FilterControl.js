import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import FilterRankContainer from "./FilterRankContainer";
import FilterTypeContainer from "./FilterTypeContainer";
import FilterPriceContainer from "./FilterPriceContainer";
import FilterBrandTypeContainer from "./FilterBrandTypeContainer";
import FilterDateContainer from "./FilterDateContainer";
import FilterTimeAvailableContainer from "./FilterTimeAvailableContainer";

class FilterControl extends PureComponent {
    render() {
        const {triggerSearch} = this.props;

        return (
            <div className={"FilterControl"}>
                <FilterRankContainer triggerSearch={triggerSearch}/>
                <FilterTimeAvailableContainer triggerSearch={triggerSearch}/>
                <FilterBrandTypeContainer triggerSearch={triggerSearch}/>
                <FilterTypeContainer triggerSearch={triggerSearch}/>
                <FilterPriceContainer triggerSearch={triggerSearch}/>
                <FilterDateContainer triggerSearch={triggerSearch}/>
            </div>
        );
    }
}

FilterControl.propTypes = {
    triggerSearch: PropTypes.func.isRequired
};

export default FilterControl;