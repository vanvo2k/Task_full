import React, {Component} from 'react';
import {FormattedMessage} from "react-intl"
import PropTypes from 'prop-types';

class JoinReferralProgramPage extends Component {
    render() {
        const {isSendingRequest} = this.props;
        return (
            <div className='JoinReferralProgramPage'>
                <div className='card join-form'>
                    <div className='card-body'>
                        <div className='row'>

                            <div className='col-9'>
                                <p className='card-title'><FormattedMessage
                                    id="settings.referral.not_register.description"/></p>
                            </div>
                            <div className='col-3'>
                                <button
                                    className='btn btn-primary join-now '
                                    onClick={this.props.onChangeReferralStatus}
                                    disabled={isSendingRequest}>
                                    <div className={isSendingRequest ? 'loader' : ''}/>
                                    <FormattedMessage id="settings.referral.not_register.join_now"/>
                                </button>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-12'>
                                <div className='error'>{this.props.errorMessage}</div>
                            </div>
                        </div>

                    </div>
                </div>
                <h3><FormattedMessage id="settings.referral.not_register.term_and_policy_title"/></h3>
                <div className='card guild'>
                    <div className='card-body'>
                        <div className='row'>

                            <div className='col-12'>
                                <ol>
                                    <li> Sign up for Affiliate program of SpyAMZ and wait for approval. After that, you
                                        can refer new users to SpyAMZ and you’ll receive a percentage of their first
                                        purchase of an item of those users. Each new user can only give 1 commission
                                        only.
                                    </li>

                                    <li>Referral code: Every member automatically has a referral code which can be
                                        edited by yourself.
                                    </li>
                                    <li>Simply paste the link or images from Assets on your site. If a new user clicks
                                        your referrer link and proceeds to sign up an account and purchase an item on
                                        SpyAMZ sites, you will receive a percentage of that person’s first payment as a
                                        commission.
                                    </li>
                                    <li>Referral program percentage: The commission rate is 30%. Each referral must be
                                        approved by the admins before being counted in your earnings. You can request a
                                        payout to us. The minimum payout threshold is $50.
                                    </li>

                                </ol>
                            </div>


                        </div>
                        <div className='row'>
                            <div className='col-12'>
                                <a href='http://bit.ly/spyamz-aff-terms' target='_blank'
                                   rel='noopener noreferrer'>
                                    <FormattedMessage id="settings.referral.not_register.see_more"/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

JoinReferralProgramPage.defaultProps = {
    isSendingRequest: false,
};

JoinReferralProgramPage.propTypes = {
    isSendingRequest: PropTypes.bool,
}

export default JoinReferralProgramPage;