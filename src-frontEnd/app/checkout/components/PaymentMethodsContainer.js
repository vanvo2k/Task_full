import React, {Component} from "react"
import {connect} from "react-redux"
import PaymentMethods from "./PaymentMethods"
import {fetchAvailableGateway} from "../actions"
import {getAvailableGateway} from "../selectors"

class PaymentMethodsContainer extends Component {
    render() {
        const {props} = this

        return <PaymentMethods {...props}/>
    }
}

PaymentMethodsContainer.propTypes = {}

const mapStateToProps = (state, props) => ({
    gateway: getAvailableGateway(state)
})

const mapDispatchToProps = {
    fetchAvailableGateway
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethodsContainer)
