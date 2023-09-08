import React, {Component} from 'react';
import {connect} from 'react-redux';
import AlertSuccess from './AlertSuccess';
import {isAlert} from "../selectors";

class AlertSuccessContainer extends Component {
    render() {
        const {props} = this;

        return <AlertSuccess {...props}/>
    }
}

const mapStateToProps = (state, props) => ({
    isAlert: isAlert(state)
})

export default connect(mapStateToProps, null)(AlertSuccessContainer)