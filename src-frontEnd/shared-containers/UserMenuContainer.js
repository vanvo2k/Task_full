import React, {Component} from "react"
import {connect} from "react-redux"
import UserMenu from "./usermenu/UserMenu"
import {logOut} from "../actions/AuthActions"
import {getProfileData, isAdmin, isSuperAdmin} from "../selectors/UserSelectors"

class UserMenuContainer extends Component {
    render() {
        const {props} = this

        return <UserMenu {...props}/>
    }
}

const mapStateToProps = (state, props) => ({
    profile: getProfileData(state),
    isAdmin: isAdmin(state),
    isSuperAdmin: isSuperAdmin(state),
})

const mapDispatchToProps = {
    logOut,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMenuContainer)
