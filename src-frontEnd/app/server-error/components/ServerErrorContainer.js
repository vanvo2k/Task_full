import React, {Component} from "react";
import {connect} from "react-redux";
import ServerError from "./ServerError";
import {getCountError, getLastError, isOpen} from "../selectors";
import {toggleModal} from "../actions";

class ServerErrorContainer extends Component {

    render() {
        const {props} = this;

        return (
            <ServerError {...props}/>
        );
    }
}

const mapStateToProps = (state, props) => ({
    error: getLastError(state),
    isOpen: isOpen(state),
    countError: getCountError(state)
});

const mapDispatchToProps = {
    toggleModal
};

export default connect(mapStateToProps, mapDispatchToProps)(ServerErrorContainer);