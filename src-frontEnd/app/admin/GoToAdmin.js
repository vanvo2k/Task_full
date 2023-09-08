import React, {Component} from "react"
import PropTypes from "prop-types"
import withAuthentication from "../../shared-components/withAuthentication"
import RedirectToLogin from "../../shared-components/RedirectToLogin"
import {List} from "immutable"
import {Redirect} from "react-router-dom"
import AuthServices from "../../services/AuthServices"
import getEnv from "../../helpers/common/getEnv"

class GoToAdmin extends Component {
    _baseAdminUrl = getEnv('baseAdminUrl')

    render() {
        const {isAuthenticated, user} = this.props

        if (!isAuthenticated) {
            return <RedirectToLogin/>
        }

        const scopes = user.get('scopes') || List()
        if (!scopes.size) {
            return <Redirect to='/'/>
        }

        if (scopes.indexOf('admin') !== -1 || scopes.indexOf('super-admin') !== -1) {
            const accessToken = AuthServices.getAccessToken()
            window.location.href = `${this._baseAdminUrl}/auth/${accessToken}`
        }

        return <Redirect to='/'/>
    }
}

GoToAdmin.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object,
}

export default withAuthentication(GoToAdmin)
