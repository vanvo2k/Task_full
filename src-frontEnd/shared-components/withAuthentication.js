import React, {Component} from 'react'
import {connect} from "react-redux"
import {isAuthenticated} from "../selectors/AuthSelectors"
import {getUserData} from "../selectors/UserSelectors"

const mapStateToProps = (state, props) => ({
    isAuthenticated: isAuthenticated(state),
    user: getUserData(state),
})

export default ComposedComponent => {
    class WithAuthentication extends Component {
        static displayName = 'withAuthentication(' + (ComposedComponent.displayName || ComposedComponent.name) + ')'

        render() {
            const {props} = this

            return <ComposedComponent {...props}/>
        }
    }

    return connect(mapStateToProps)(WithAuthentication)
}
