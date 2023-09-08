import React, {Component} from "react"
import PropTypes from "prop-types"
import {FormattedMessage} from "react-intl"

class ReferralStatistic extends Component {
    render() {
        const {clicks, referrals, pending, earned, paid} = this.props

        return (
            <div className='ReferralStatistic'>

                <h4 className="card-title"><FormattedMessage id="settings.referral.accepted.referral_statistic.title"/></h4>
                <div className="card">
                    <table className="table">
                        <tbody>
                        <tr className="referral-row">
                            <td className="row-title"><FormattedMessage id="settings.referral.accepted.referral_statistic.click.title"/></td>
                            <td><FormattedMessage id="settings.referral.accepted.referral_statistic.click.description"/></td>
                            <td>{clicks}</td>
                        </tr>
                        <tr className="referral-row">
                            <td className="row-title"><FormattedMessage id="settings.referral.accepted.referral_statistic.referral.title"/></td>
                            <td><FormattedMessage id="settings.referral.accepted.referral_statistic.referral.description"/></td>
                            <td>{referrals}</td>
                        </tr>
                        <tr className="referral-row">
                            <td className="row-title"><FormattedMessage id="settings.referral.accepted.referral_statistic.pending.title"/></td>
                            <td><FormattedMessage id="settings.referral.accepted.referral_statistic.pending.description"/></td>
                            <td>
                                {
                                    pending ? '$' + pending : 0
                                }
                            </td>
                        </tr>
                        <tr className="referral-row">
                            <td className="row-title"><FormattedMessage id="settings.referral.accepted.referral_statistic.earned.title"/></td>
                            <td><FormattedMessage id="settings.referral.accepted.referral_statistic.earned.description"/></td>
                            <td>
                                {
                                    earned ? '$' + earned : 0
                                }
                            </td>
                        </tr>
                        <tr className="referral-row">
                            <td className="row-title"><FormattedMessage id="settings.referral.accepted.referral_statistic.paid.title"/></td>
                            <td><FormattedMessage id="settings.referral.accepted.referral_statistic.paid.description"/></td>
                            <td>
                                {
                                    paid ? '$' + paid : 0
                                }
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        )
    }
}

ReferralStatistic.propTypes = {
    any: PropTypes.any
}

export default ReferralStatistic
