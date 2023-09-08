import React, {Component, Fragment} from "react";
import Loadable from 'react-loadable';
import {Route, Switch} from "react-router-dom";

import PricingPageContainer from "./app/pricing/components/PricingPageContainer";
import HomePageContainer from "./app/homepage/components/HomePageContainer";
import LoginPageContainer from "./app/login/components/LoginPageContainer";
import PageNotFoundContainer from "./app/page-not-found/components/PageNotFoundContainer";
import OauthCallbackContainer from "./app/oauth-callback/components/OauthCallbackContainer";
import PreLoading from "./shared-components/PreLoading";
import MyTheme from "./shared-components/MyTheme";
import {addLanguageListener, getMessages, getUserLanguage, removeLanguageListener} from "./services/LocaleServices";
import {IntlProvider} from "react-intl";
import getFingerPrint from "./helpers/common/getFingerPrint";
import getEnv from "./helpers/common/getEnv";
import setCookie from "./helpers/cookie/setCookie";
import GoToAdmin from "./app/admin/GoToAdmin"
import ReferralTracking from "./shared-components/ReferralTracking"

const LoadableSettingsContainer = Loadable({
    loader: () => import("./app/settings/components/SettingsContainer"),
    loading: PreLoading
});

const LoadableDashboardContainer = Loadable({
    loader: () => import("./app/dashboard/components/DashboardContainer"),
    loading: PreLoading
});

const LoadableBackgroundContainer = Loadable({
    loader: () => import("./app/background/components/BackgroundContainer"),
    loading() {
        return null;
    }
});

const LoadableCheckoutContainer = Loadable({
    loader: () => import("./app/checkout/components/CheckoutPageContainer"),
    loading: PreLoading
});

const LoadableNotificationBarContainer = Loadable({
    loader: () => import("./app/notification-bar/components/NotificationBarContainer"),
    loading() {
        return null;
    }
});

class App extends Component {
    state = {
        language: getUserLanguage(),
    };

    headTag = document.querySelector("head");
    script = document.createElement("script");
   
    componentDidMount() {
        addLanguageListener(this._handleChangeLanguage);

        getFingerPrint()
            .then(uid => {
                const domain = getEnv('domain');

                setCookie('_spz_uuid', uid, 10, domain);
            });


            this.script.innerHTML=` (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:3599263,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`;  
            this.headTag.appendChild(this.script)
            
    }

    componentWillUnmount() {
        removeLanguageListener(this._handleChangeLanguage);
        this.script.remove();
    }

    _handleChangeLanguage = (language) => {
        this.setState({
            language
        });
    };

    render() {
        const {language} = this.state;

        return (
            <IntlProvider textComponent={Fragment} locale={language} messages={getMessages()}>
                <MyTheme>
                    <div id="app">
                        <ReferralTracking/>
                        <LoadableNotificationBarContainer/>

                        <Switch>
                            <Route exact path="/" component={HomePageContainer}/>
                            <Route path="/a" component={LoadableDashboardContainer}/>
                            <Route path="/settings" component={LoadableSettingsContainer}/>
                            <Route path="/login" component={LoginPageContainer}/>
                            <Route path="/pricing" component={PricingPageContainer}/>
                            <Route path="/checkout" component={LoadableCheckoutContainer}/>
                            <Route path="/oauth-callback" component={OauthCallbackContainer}/>
                            <Route path="/ass" component={GoToAdmin}/>
                            <Route component={PageNotFoundContainer}/>
                        </Switch>

                        <LoadableBackgroundContainer/>
                    </div>
                </MyTheme>
            </IntlProvider>
        );
    }
}

export default App;
