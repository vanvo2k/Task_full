import React, {Component} from "react"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {getUserRoles} from "../selectors/UserSelectors"

class UserHasRoleContainer extends Component {
    render() {
        const {roles, hasRole, noAlert} = this.props

        if (!roles.size || roles.indexOf(hasRole) === -1) {
            if (noAlert) {
                return null
            }

            return <div className="text-center" style={{padding: '20px 0'}}>You has not role {hasRole}</div>
        }

        return this.props.children
    }
}

UserHasRoleContainer.defaultProps = {
    noAlert: false,
}

UserHasRoleContainer.propTypes = {
    children: PropTypes.node.isRequired,
    roles: PropTypes.object.isRequired,
    hasRole: PropTypes.string.isRequired,
    noAlert: PropTypes.bool
}

const mapStateToProps = (state, props) => ({
    roles: getUserRoles(state)
})

export default connect(mapStateToProps, null)(UserHasRoleContainer)
