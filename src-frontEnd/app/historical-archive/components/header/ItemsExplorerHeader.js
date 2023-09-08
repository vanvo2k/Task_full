import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import SearchControlContainer from "./search/SearchControlContainer";
import FilterControlContainer from "./filter/FilterControlContainer";
import SortControlContainer from "./sort/SortControlContainer";
import SearchResultContainer from "./SearchResultContainer";
import SwitchLayoutContainer from "./sort/SwitchLayoutContainer";

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
        const {className, isAdvancedSearch} = props;

        return (
            <div className={classNames('ItemsExplorerHeader', className, {isAdvancedSearch})}
                 ref="root">

                <div className="Top">
                    <div className="container">
                        <div className="Wrapper">
                            <SearchControlContainer triggerSearch={this._triggerSearchResetPage}/>
                            <FilterControlContainer triggerSearch={this._triggerSearchResetPage}/>
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