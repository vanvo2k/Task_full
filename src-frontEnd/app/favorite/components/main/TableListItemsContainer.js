import React, {Component} from "react";
import {connect} from "react-redux";
import TableListItems from "./TableListItems";
import {getListItems} from "../../selectors";
import {getCurrentLayout} from "../../../search/selectors";

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
    layout: getCurrentLayout(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(TableListItemsContainer);