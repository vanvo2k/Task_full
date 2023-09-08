import React, {Component} from "react";
import {connect} from "react-redux";
import PaymentMethods from "./PaymentMethods";

class PaymentMethodsContainer extends Component {
    render() {
        const {props} = this;

        return <PaymentMethods {...props}/>
    }
}

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethodsContainer);