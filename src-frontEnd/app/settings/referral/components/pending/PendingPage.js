import React, {Component} from 'react'
import {FormattedMessage} from "react-intl"

class PendingPage extends Component {
    render() {
        return (
            <div className='PendingPage'>
                <div className='card'>
                    <div className='card-body'>
                        <div><FormattedMessage id="settings.referral.pending.status"/>
                            <span className='status'><FormattedMessage id="settings.referral.pending.pending"/></span>
                        </div>
                        <div><FormattedMessage id="settings.referral.pending.description"/></div>
                        <div>
                            <FormattedMessage id="settings.referral.pending.waiting_for_result"/>
                            <a href='http://bit.ly/spyamz-aff-terms' target='_blank' rel='noopener noreferrer'>
                                <FormattedMessage id="settings.referral.pending.term_and_policy"/>
                            </a>
                            <FormattedMessage id="settings.referral.pending.of_the_program"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PendingPage;



