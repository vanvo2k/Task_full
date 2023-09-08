import React, {Component} from 'react';
import {FormattedMessage} from "react-intl"

class PolicyPage extends Component {
    render() {
        return (
            <div className='PolicyPage'>
                <div className='card'>
                    <div className='card-body'>
                        <div>
                            <FormattedMessage id="settings.referral.accepted.policy.how_it_work"/>
                            <a href='http://bit.ly/spyamz-aff-terms' target='_blank' rel='noopener noreferrer'>
                                <FormattedMessage id="settings.referral.accepted.policy.term_and_policy"/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PolicyPage;