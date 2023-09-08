import React, {Component} from "react"
import AffiliatePage from "./AffiliatePage"
import {ACCEPTED, BLOCKED, ERROR, INITIAL, NOT_SEND_REQUEST_YET, PENDING, REJECTED} from "./constants"
import {_getReferralStatus} from "../../../../services/ReferralServices"
import * as RealtimeServices from "../../../../services/ws/RealtimeServices"
import DocTitle from "../../../../shared-components/DocTitle"

class AffiliatePageContainer extends Component {
    state = {
        affiliateCode: '',
    }

    componentDidMount() {
        // const profile = StorageServices.getUserData()
        // this.setState({affiliateCode: profile.affiliateCode})
        // this._fetchCurrentStatus()
        // RealtimeServices.subscribe('affiliate-registration-confirmed', this._handleRegistrationChange)
    }

    componentWillUnmount() {
        // RealtimeServices.unsubscribe('affiliate-registration-confirmed', this._handleRegistrationChange)
    }

    _changeReferralStatus = (referralStatus) => {
        this.setState({
            referralStatus,
        })
    }

    render() {
        return (
            <DocTitle title="Affiliate">
                <AffiliatePage {...this.state} onChangeReferralStatus={this._changeReferralStatus}/>
            </DocTitle>
        )
    }
}

export default AffiliatePageContainer
