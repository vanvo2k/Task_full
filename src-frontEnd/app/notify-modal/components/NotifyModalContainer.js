import React, {Component} from "react";
import {connect} from "react-redux";
import {hideNotify, showNotify} from "../actions";
import {getNotifyData} from "../selectors";
import NotifyModal from "./NotifyModal";

class NotifyModalContainer extends Component {
    render() {
        const {props} = this;

        return (
            <NotifyModal {...props} />
        );
    }
}

const mapStateToProps = (state, props) => ({
    data: getNotifyData(state)
});

const mapDispatchToProps = {
    showNotify,
    hideNotify
};

export default connect(mapStateToProps, mapDispatchToProps)(NotifyModalContainer);