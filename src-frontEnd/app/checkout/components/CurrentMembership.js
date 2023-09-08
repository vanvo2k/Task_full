import React, {Component} from "react"
import PropTypes from "prop-types"
import {Button} from "reactstrap"
import {Link} from "react-router-dom"
import timeHuman from "../../../helpers/time/timeHuman"

class CurrentMembership extends Component {
    render() {
        const {membership} = this.props

        if (!membership || !membership.size) {
            return null
        }

        const plan = membership.get('plan')
        const user = membership.get('owner')
        const finish = membership.get('finish')

        return (
            <div className="CurrentMembership">
                <h3 className="Title">Checkout Complete!</h3>

                <div className="Icon">
                    <span className="linear-checkmark-circle"/>
                </div>

                <div className="Membership">
                    <div className="User">Email: {user.get('email')}</div>
                    <div className="Name">Plan: <strong>{plan.get('title')}</strong></div>

                    <div className="Start">Expiration time: {timeHuman(finish)}</div>
                </div>

                <div className="Goto">
                    <Button color="primary" to="/a" tag={Link}>Go to dashboard</Button>
                    <Button color="link" to="/settings/billing" tag={Link}>Billing</Button>
                </div>
            </div>
        )
    }
}

CurrentMembership.propTypes = {
    membership: PropTypes.object.isRequired
}

export default CurrentMembership
