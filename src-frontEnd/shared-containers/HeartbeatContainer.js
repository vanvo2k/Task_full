import React, {Component} from "react"
import {connect} from "react-redux"
import {heartbeat} from "../actions/UserActions"
import Heartbeat from "./heartbeat/Heartbeat"
import EnsureLoggedInContainer from "./EnsureLoggedInContainer"
import {isAuthenticated} from "../selectors/AuthSelectors"
import {getProfileData} from "../selectors/UserSelectors"
import {logOut} from "../actions/AuthActions"

class HeartbeatContainer extends Component {
    render() {
        const {props} = this

        return (
            <EnsureLoggedInContainer redirect={false}>
                <Heartbeat {...props}/>
            </EnsureLoggedInContainer>
        )
    }
}

const mapStateToProps = (state, props) => ({
    isAuthenticated: isAuthenticated(state),
    profile: getProfileData(state)
})

const mapDispatchToProps = {
    heartbeat,
    logOut
}

export default connect(mapStateToProps, mapDispatchToProps)(HeartbeatContainer)
