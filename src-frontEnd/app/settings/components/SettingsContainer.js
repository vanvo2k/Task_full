import React, {Component} from "react";
import {connect} from "react-redux";
import ProfileSettingsContainer from "../profile/components/ProfileSettingsContainer";
import BillingSettingsContainer from "../billing/components/BillingSettingsContainer";
import EnsureLoggedInContainer from "../../../shared-containers/EnsureLoggedInContainer";
import SettingsPage from "./SettingsPage";
import {getSettings} from "../selectors";
import ReferralsPageContainer from "../referral/components/ReferralsPageContainer"
import AffiliatePageContainer from "../referral/components/AffiliatePageContainer"

class SettingsContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            routes: [
                {
                    path: '/profile',
                    title: 'Profile',
                    key: 'profile',
                    content: ProfileSettingsContainer
                },
                {
                    path: '/billing',
                    title: 'Billing',
                    key: 'billing',
                    content: BillingSettingsContainer
                },
                // {
                //     path: '/referral',
                //     title: 'Referral',
                //     key: 'referral',
                //     content: ReferralsPageContainer
                // },
                {
                    path: '/affiliate',
                    title: 'Affiliate',
                    key: 'affiliate',
                    content: AffiliatePageContainer
                }
            ]
        };
    }

    render() {
        const {props} = this;
        const {routes} = this.state;

        return (
            <EnsureLoggedInContainer>
                <SettingsPage routes={routes} {...props}/>
            </EnsureLoggedInContainer>
        );
    }
}

const mapStateToProps = (state, props) => ({
    settings: getSettings(state)
});

export default connect(mapStateToProps)(SettingsContainer);