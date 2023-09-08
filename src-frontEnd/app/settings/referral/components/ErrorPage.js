import React, {Component} from "react";
import {FormattedMessage} from "react-intl"

class ErrorPage extends Component {
    render() {
        const message = this.props.message || <FormattedMessage id="settings.referral.error.message"/>
        return (
            <div className='ReferralLink'>
                <div className="card">
                    <div className="card-body">
                        <p>{message}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default ErrorPage;