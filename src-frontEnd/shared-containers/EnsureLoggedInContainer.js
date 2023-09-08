import React, {Component} from "react"
import {connect} from "react-redux"
import PropTypes from "prop-types"

import {isAuthenticated} from "../selectors/AuthSelectors"
import RedirectToLogin from "../shared-components/RedirectToLogin"

class EnsureLoggedInContainer extends Component {
    render() {
        const {isAuthenticated, redirect} = this.props

        if (!isAuthenticated) {
            if (redirect) {
               if(window.location.pathname!=="/"){
                return <RedirectToLogin/>
               }
            } else {
                return null
            }
        }

        return this.props.children
    }
}

EnsureLoggedInContainer.defaultProps = {
    redirect: true
}

EnsureLoggedInContainer.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    redirect: PropTypes.bool.isRequired,
}

const mapStateToProps = (state, props) => ({
    isAuthenticated: isAuthenticated(state)
})

export default connect(mapStateToProps, null)(EnsureLoggedInContainer)
