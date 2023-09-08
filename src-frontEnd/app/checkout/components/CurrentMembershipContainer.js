import React, {Component} from "react"
import {connect} from "react-redux"
import CurrentMembership from "./CurrentMembership"
import {getCurrentMembership} from "../selectors"

class CurrentMembershipContainer extends Component {
    render() {
        const {props} = this

        return <CurrentMembership {...props}/>
    }
}

const mapStateToProps = (state, props) => ({
    membership: getCurrentMembership(state)
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentMembershipContainer)
