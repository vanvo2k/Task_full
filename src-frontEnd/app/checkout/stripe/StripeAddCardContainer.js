import React, {Component} from "react"
import {connect} from "react-redux"
import StripeAddCard from "./StripeAddCard"
import {getStripeUser} from "../selectors"
import {addCardToCustomer} from "../stripeActions"

class StripeAddCardContainer extends Component {
    render() {
        const {props} = this

        return <StripeAddCard {...props}/>
    }
}

const mapStateToProps = (state, props) => ({
    user: getStripeUser(state)
})

const mapDispatchToProps = {
    addCardToCustomer,
}

export default connect(mapStateToProps, mapDispatchToProps)(StripeAddCardContainer)
