import { is } from "immutable";
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

export default class UpgradePopup extends Component {
  state = {
    isOpenUpgradePopup: false,
  };
// 666666
//pop-trial
  componentDidMount() {
    const isOpenUpgradePopup = this.props.isOpenUpgradePopup;
    this.setState({ ...this.state, isOpenUpgradePopup: isOpenUpgradePopup });
  }

  componentDidUpdate() {
    if (
      this.state.isOpenUpgradePopup !==
      this.props.isOpenUpgradePopup
    ) {
      const isOpenUpgradePopup = this.props.isOpenUpgradePopup;
      this.setState({ ...this.state, isOpenUpgradePopup: isOpenUpgradePopup });
    }
  }

  render() {
    const {  onUpgradePopup } = this.props;
    const { isOpenUpgradePopup } = this.state;
    return (
      <div className={`UpgradePopup ${isOpenUpgradePopup && "Active"}`}>
        <div
          className="PopupOverlay"
          onClick={() => {
            onUpgradePopup();
          }}
        ></div>
        <div className="Popup">
          <div
            className="Close"
            onClick={() => {
              onUpgradePopup();
            }}
          >
            <img src="/assets/images/close.png" alt="" />
          </div>
          <h2>
            <FormattedMessage id={`upgrade.trial_trademark.title`} />
          </h2>
          <p className="Description">
            <FormattedMessage id={`upgrade.trial_trademark.description`} />
          </p>
          <div className="PopupActions">
            <Link to={`/pricing?plan=pro`} className="btn btn-success">
              <FormattedMessage id={`upgrade.trial_trademark.upgrade`} />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
