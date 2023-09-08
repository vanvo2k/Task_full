import React, {Component} from "react";
import {connect} from "react-redux";
import ItemsExplorerHeader from "./ItemsExplorerHeader";
import {changePaginationNumber, initCheckQuerySearch} from "../actions";
import {withRouter} from "react-router-dom";

class ItemsExplorerHeaderContainer extends Component {
    render() {
        const {props} = this;

        return (
            <ItemsExplorerHeader {...props} />
        );
    }
}

const mapStateToProps = (state, props) => ({

})

const mapDispatchToProps = {
    initCheckQuerySearch,
    changePaginationNumber
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemsExplorerHeaderContainer));