import React, {Component} from "react";
import {connect} from "react-redux";
import PaginationItems from "./PaginationItems";
import {getPaginationControlData, isOpenShowItem} from "../../selectors";
import {changePaginationNumber} from "../../actions";
import {withRouter} from "react-router-dom";

class PaginationItemsContainer extends Component {
    render() {
        const {props} = this;

        return <PaginationItems {...props}/>
    }
}

const mapStateToProps = (state, props) => ({
    pagination: getPaginationControlData(state),
    isOpenShowItem: isOpenShowItem(state)
});

const mapDispatchToProps = {
    changePaginationNumber
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PaginationItemsContainer));