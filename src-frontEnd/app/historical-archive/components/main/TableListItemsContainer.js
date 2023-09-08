import React, {Component} from "react";
import {connect} from "react-redux";
import TableListItems from "./TableListItems";
import {getCurrentLayout, getListItems, getMessageError, isFetchingListItem, getFilterHistoricalDay} from "../../selectors";

class TableListItemsContainer extends Component {
    render() {
        const {props} = this;

        return (
            <TableListItems {...props}/>
        );
    }
}

const mapDispatchToProps = {};

const mapStateToProps = (state) => ({
    items: getListItems(state),
    loading: isFetchingListItem(state),
    layout: getCurrentLayout(state),
    error: getMessageError(state),
    historicalDate: getFilterHistoricalDay(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableListItemsContainer);