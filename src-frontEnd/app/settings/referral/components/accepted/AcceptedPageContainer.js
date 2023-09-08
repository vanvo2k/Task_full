import React, {Component} from 'react'
import ReferralsLinkContainer from "./ReferralsLinkContainer";
import ReferralStatisticContainer from "./ReferralStatisticContainer";
import PaypalEmailContainer from "./PaypalEmailContainer";
import PolicyPage from "./PolicyPage"

class AcceptedPageContainer extends Component {
    render() {
        return (
            <div>
                <ReferralsLinkContainer/>
                <ReferralStatisticContainer/>
                <PaypalEmailContainer/>
                <PolicyPage/>
            </div>
        )
    }
}

export default AcceptedPageContainer;