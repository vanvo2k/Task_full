import React, {Component} from 'react';
import {FormattedMessage} from "react-intl"

class BlockedPage extends Component{
    render(){
        return (
            <div className='RejectedPage card'>
                <div className='card'>
                    <div className='card-body'>
                        <div>
                            <FormattedMessage id="settings.referral.blocked.status"/>
                            <span className='status'>
                                <FormattedMessage id="settings.referral.blocked.blocked"/>
                            </span>
                        </div>
                        <div className='red-text'>
                            <FormattedMessage id="settings.referral.blocked.description"/>
                        </div>
                        <div>
                            <FormattedMessage id="settings.referral.blocked.you_can_read"/>
                            <a href='http://bit.ly/spyamz-aff-terms' target='_blank' rel='noopener noreferrer'>
                                <FormattedMessage id="settings.referral.blocked.term_and_policy"/>
                            </a>
                            <FormattedMessage id="settings.referral.blocked.or_contact"/>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

}
export default BlockedPage