import React, {Component} from "react"
import PropTypes from "prop-types"
import PendingPageContainer from "./pending/PendingPageContainer"
import RejectedPageContainer from "./rejected/RejectedPageContainer"
import AcceptedPageContainer from "./accepted/AcceptedPageContainer"
import JoinReferralProgramContainer from "./notRegister/JoinReferralProgramContainer"
import {ACCEPTED, NOT_SEND_REQUEST_YET, PENDING, REJECTED, INITIAL, BLOCKED} from "./constants"
import ErrorPage from "./ErrorPage"
import Loading from "../../../../shared-components/Loading"
import {FormattedMessage} from 'react-intl'
import BlockedPageContainer from "./blocked/BlockedPageContainer"

class ReferralsPage extends Component {
    render() {
        const {referralStatus, onChangeReferralStatus} = this.props
        const maps = {
            [INITIAL]: <Loading loading={true}/>,
            [NOT_SEND_REQUEST_YET]: <JoinReferralProgramContainer onChangeReferralStatus={onChangeReferralStatus}/>,
            [ACCEPTED]: <AcceptedPageContainer/>,
            [REJECTED]: <RejectedPageContainer/>,
            [PENDING]: <PendingPageContainer/>,
            [BLOCKED]: <BlockedPageContainer/>
        }

        const viewer = maps[referralStatus] || <ErrorPage/>

        return (
            <div className="ReferralsPage">
                <h2 className="title"><FormattedMessage id="settings.referral.title"/></h2>
                {viewer}
            </div>
        )
    }
}

ReferralsPage.propTypes = {
    onChangeReferralStatus: PropTypes.func.isRequired,
}

export default ReferralsPage
