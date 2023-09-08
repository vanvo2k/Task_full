import React, {Component} from "react";
import {connect} from "react-redux";
import ControlShowItems from "./ControlShowItems";
import {getPaginationControlData} from "../../selectors";
import {changePaginationNumber, changePaginationPerPage} from "../../actions";
import {saveUserSettings} from "../../../../actions/UserActions";

class ControlShowItemsContainer extends Component {
    render() {
        const {props} = this;

        return (
            <ControlShowItems {...props} />
        );
    }
}

const mapStateToProps = (state, props) => ({
    pagination: getPaginationControlData(state)
});

const mapDispatchToProps = {
    changePaginationNumber,
    changePaginationPerPage,
    saveUserSettings
};

export default connect(mapStateToProps, mapDispatchToProps)(ControlShowItemsContainer);