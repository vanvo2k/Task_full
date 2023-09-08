import React, {Component} from "react";
import {connect} from "react-redux";
import {getDataModalShowItem, getPaginationControlData, getFilterHistoricalDay} from "../selectors";
import ShowItemDetail from "./preview/ShowItemDetail";
import {changePaginationNumber, closeModalItemDetail, showItemDetail} from "../actions";

class ShowItemDetailContainer extends Component {
    render() {
        const {props} = this;

        return <ShowItemDetail {...props} />
    }
}

const mapStateToProps = (state, props) => ({
    modal: getDataModalShowItem(state),
    pagination: getPaginationControlData(state),
    historicalDate: getFilterHistoricalDay(state)
});

const mapDispatchToProps = {
    showItemDetail,
    closeModalItemDetail,
    changePaginationNumber
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowItemDetailContainer);