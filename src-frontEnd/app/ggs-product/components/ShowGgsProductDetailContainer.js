import React, {Component} from "react";
import {connect} from "react-redux";
import {getDataModalShowItem, getPaginationControlData} from "../selectors";
import ShowItemDetail from "./preview/ShowItemDetail";
import {changePaginationNumber, closeModalItemDetail, showItemDetail} from "../actions";

class ShowGgsProductDetailContainer extends Component {
    render() {
        const {props} = this;

        return <ShowItemDetail {...props} />
    }
}

const mapStateToProps = (state, props) => ({
    modal: getDataModalShowItem(state),
    pagination: getPaginationControlData(state),
});

const mapDispatchToProps = {
    showItemDetail,
    closeModalItemDetail,
    changePaginationNumber
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowGgsProductDetailContainer);