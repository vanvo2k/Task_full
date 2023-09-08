import React, {Component} from "react"
import ReferralsPage from "./ReferralsPage"
import {ACCEPTED, BLOCKED, ERROR, INITIAL, NOT_SEND_REQUEST_YET, PENDING, REJECTED} from "./constants"
import {_getReferralStatus} from "../../../../services/ReferralServices"
import * as RealtimeServices from "../../../../services/ws/RealtimeServices"
import DocTitle from "../../../../shared-components/DocTitle"

class ReferralsPageContainer extends Component {
    state = {
        referralStatus: INITIAL,
    }

    componentDidMount() {
        this._fetchCurrentStatus()
        RealtimeServices.subscribe('affiliate-registration-confirmed', this._handleRegistrationChange)
    }

    componentWillUnmount() {
        RealtimeServices.unsubscribe('affiliate-registration-confirmed', this._handleRegistrationChange)
    }

    _handleRegistrationChange = () => {
        this._fetchCurrentStatus()
    }

    _fetchCurrentStatus = () => {
        _getReferralStatus()
            .then(result => {
                const {success, data} = result

                if (!success) {
                    return this.setState({
                        referralStatus: ERROR,
                    })
                }

                const ALLOW_STATUS = [NOT_SEND_REQUEST_YET, PENDING, ACCEPTED, REJECTED, BLOCKED]
                const statusValidated = ALLOW_STATUS.indexOf(data) !== -1 ? data : ERROR

                this.setState({
                    referralStatus: statusValidated
                })
            })
            .catch(err => {
                this.setState({
                    referralStatus: err,
                })
            })
    }

    _changeReferralStatus = (referralStatus) => {
        this.setState({
            referralStatus,
        })
    }

    render() {
        return (
            <DocTitle title="Referral">
                <ReferralsPage {...this.state} onChangeReferralStatus={this._changeReferralStatus}/>
            </DocTitle>
        )
    }
}

export default ReferralsPageContainer
