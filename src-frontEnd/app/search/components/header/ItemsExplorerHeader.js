import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import SearchControlContainer from "./search/SearchControlContainer";
import FilterControlContainer from "./filter/FilterControlContainer";
import SortControlContainer from "./sort/SortControlContainer";
import SearchResultContainer from "./SearchResultContainer";
import AnalyticActionsContainer from "./query/AnalyticActionsContainer";
import SwitchLayoutContainer from "./sort/SwitchLayoutContainer";
import AdsAnnouncementContainer from "./announcement/AdsAnnouncementContainer";
import ExportSearchResultContainer from "./export/ExportSearchResultContainer";
import KeywordSuggestionContainer from "../keywordSuggestion/KeywordSuggestionContainer";
import KeywordChartContainer from "../keyword-chart/KeywordChartContainer";

class ItemsExplorerHeader extends Component {
    componentDidMount() {
        const {history, triggerSearch, initCheckQuerySearch} = this.props;

        initCheckQuerySearch(history)
            .then(() => {
                return triggerSearch();
            });
    }

    render() {
        const {props} = this;
        const {className, isAdvancedSearch,onUpgradePopup} = props;

        return (
            <div className={classNames('ItemsExplorerHeader', className, {isAdvancedSearch})}
                 ref="root">

                <div className="Top">
                    <div className="container">
                        <div className="Wrapper">
                            <SearchControlContainer triggerSearch={this._triggerSearchResetPage}/>
                            <FilterControlContainer triggerSearch={this._triggerSearchResetPage} onUpgradePopup={onUpgradePopup}/>
                            <AdsAnnouncementContainer/>
                            <ExportSearchResultContainer/>
                            <AnalyticActionsContainer triggerSearch={this._triggerSearchResetPage}/>
                        </div>
                    </div>
                </div>

                <div className="Middle">
                    <div className="container">
                        <div className="Wrapper">
                            <KeywordChartContainer />
                            {/* <KeywordSuggestionContainer /> */}
                        </div>
                    </div>
                </div>

                <div className="Bottom">
                    <div className="container">
                        <div className="Wrapper">
                            <SortControlContainer triggerSearch={this._triggerSearchResetPage}/>
                            <SwitchLayoutContainer/>
                            <SearchResultContainer/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    _triggerSearchResetPage = () => {
        const {changePaginationNumber, triggerSearch, history} = this.props;

        return changePaginationNumber(1, history)
            .then(() => {
                return triggerSearch();
            });
    };
}

ItemsExplorerHeader.propTypes = {
    isAdvancedSearch: PropTypes.bool,
    history: PropTypes.object.isRequired,
    triggerSearch: PropTypes.func.isRequired,
    initCheckQuerySearch: PropTypes.func.isRequired,
    changePaginationNumber: PropTypes.func.isRequired,
};

export default ItemsExplorerHeader;
