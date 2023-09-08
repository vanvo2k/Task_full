import React, {Component} from "react";
import {connect} from "react-redux";
import ItemsExplorerHeader from "./ItemsExplorerHeader";
import {changePaginationNumber, initCheckQuerySearch} from "../../actions";
import {withRouter} from "react-router-dom";
import {isAdvancedSearch} from "../../selectors";

class ItemsExplorerHeaderContainer extends Component {
    render() {
        const {props,onUpgradePopup} = this;

        return (
            <ItemsExplorerHeader {...props} />
        );
    }
}

const mapStateToProps = (state, props) => ({
    isAdvancedSearch: isAdvancedSearch(state)
});

const mapDispatchToProps = {
    initCheckQuerySearch,
    changePaginationNumber
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemsExplorerHeaderContainer));