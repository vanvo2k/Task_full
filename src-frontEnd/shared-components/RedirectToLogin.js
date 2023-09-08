import React, {PureComponent} from "react"
import {Redirect, withRouter} from "react-router-dom"

import AuthService from "../services/AuthServices"
import StorageService from "../services/StorageServices"

class RedirectToLogin extends PureComponent {
    render() {
        this._storeCurrentURL()
        AuthService.logout()

        return <Redirect push to="/login"/>
    }

    _storeCurrentURL() {
        const {history} = this.props
        const {pathname, search, hash} = history.location
        const redirectTo = pathname + search + hash
        StorageService.set('redirectTo', redirectTo)
    }
}

export default withRouter(RedirectToLogin)
