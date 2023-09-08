import React, { Component } from 'react'
import PropTypes, { func } from 'prop-types'
import { Button } from 'reactstrap'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

class ButtonSubscription extends Component {
    render() {
        const { isAuthenticated, planId } = this.props
        return (
            <div className={classNames('ButtonSubscription', planId)}>
                {!isAuthenticated ? (
                    this._renderGoToLogin()
                ) : (
                    <Button tag={Link} to={`/a/subscribe/${planId}`} color="primary">
                        <span>
                            <FormattedMessage id="pricing.subscribe" />
                        </span>
                    </Button>
                )}
            </div>
        )
    }

    _renderGoToLogin() {
        const { planId } = this.props
        const redirectTo = `/a/subscribe/${planId}`

        return (
            <Button color="success" tag={Link} to={`/login?redirectTo=${redirectTo}`}>
                <FormattedMessage id="pricing.subscribe" />
            </Button>
        )
    }
}

ButtonSubscription.propTypes = {
    isFree: PropTypes.bool,
    planId: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool,
}

export default ButtonSubscription
