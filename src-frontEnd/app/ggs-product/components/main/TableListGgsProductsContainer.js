import React, {Component} from "react";
import {connect} from "react-redux";
import {getCurrentLayout, getListItems, getMessageError, isFetchingListItem} from "../../selectors";
import TableListGgsProducts from "./TableListGgsProducts";

class TableListGgsProductsContainer extends Component {
    render() {
        const {props} = this;

        return (
            <TableListGgsProducts {...props}/>
        );
    }
}

const mapDispatchToProps = {};

const mapStateToProps = (state) => ({
    items: getListItems(state),
    loading: isFetchingListItem(state),
    layout: getCurrentLayout(state),
    error: getMessageError(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(TableListGgsProductsContainer);