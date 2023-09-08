import React, { Component, Fragment } from "react";
import GoogleAnalytics from "./GoogleAnalytics";
import AppUpdaterContainer from "../../../shared-containers/AppUpdaterContainer";
import HeartbeatContainer from "../../../shared-containers/HeartbeatContainer";
import { ImmutableLoadingBar as LoadingBar } from "react-redux-loading-bar";
import NotifyModalContainer from "../../notify-modal/components/NotifyModalContainer";
import Sentry from "./Sentry";
import OneSignalComponent from "./OneSignal";
import ServerErrorContainer from "../../server-error/components/ServerErrorContainer";
import OptInEmailContainer from "./OptInEmailContainer";
import EnsureLoggedInContainer from "../../../shared-containers/EnsureLoggedInContainer";
import Loadable from "react-loadable";

const FreshChat = Loadable({
  loader: () => import("../fresh-chat/FreshChat"),
  loading() {
    return null;
  },
});

class Background extends Component {
  render() {
    return (
      <Fragment>
        <OptInEmailContainer />

        <NotifyModalContainer />

        <LoadingBar
          className="LoadingBar"
          updateTime={300}
          style={{ zIndex: 99, position: "fixed", height: "2px", top: 0 }}
        />

        <AppUpdaterContainer />
        <HeartbeatContainer />

        <ServerErrorContainer />

        {/* <EnsureLoggedInContainer redirect={false}> */}
        <EnsureLoggedInContainer>
          <OneSignalComponent />
        </EnsureLoggedInContainer>

        <FreshChat />

        {this._renderProduction()}
      </Fragment>
    );
  }

  _renderProduction() {
    if (process.env.REACT_APP_ENV === "production") {
      return (
        <Fragment>
          <Sentry />
          <GoogleAnalytics />
        </Fragment>
      );
    }
  }
}

export default Background;
