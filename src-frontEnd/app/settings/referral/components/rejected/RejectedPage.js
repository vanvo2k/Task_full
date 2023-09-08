import React, {Component} from 'react'
import {FormattedMessage} from "react-intl"

class RejectedPage extends Component {
    render() {
        return (
            <div className='RejectedPage card'>
                <div className='card'>
                    <div className='card-body'>
                        <div>
                            <FormattedMessage id="settings.referral.rejected.status"/>
                            <span className='status'>
                                <FormattedMessage id="settings.referral.rejected.rejected"/>
                            </span>
                        </div>
                        <div className='red-text'>
                            <FormattedMessage id="settings.referral.rejected.description"/>
                        </div>
                        <div>
                            <FormattedMessage id="settings.referral.rejected.you_can_read"/>
                            <a href='http://bit.ly/spyamz-aff-terms' target='_blank' rel='noopener noreferrer'>
                                <FormattedMessage id="settings.referral.rejected.term_and_policy"/>
                            </a>
                            <FormattedMessage id="settings.referral.rejected.to_find_out"/>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default RejectedPage;