import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Tooltip } from "react-tippy";
import FilterRankEditor from "./FilterRankEditor";
import formatNumberText from "../../../../../helpers/common/formatNumberText";
import {
  changeQuerySearch,
  parseSearchQuery,
} from "../../../../../helpers/RouterHelper";

class FilterRank extends Component {
  componentDidMount() {
    const { userScope,setTrialQueryRank} = this.props;
    const isUserTrial =
      (userScope.includes("trial") &&
        !userScope.includes("admin") &&
        !userScope.includes("mod")) ||
      false;
      if(isUserTrial){
        setTrialQueryRank()
      }
  }

  componentDidUpdate() {
    this._syncQuery();
  }

  _syncQuery() {
    const { data, history } = this.props;

    const parsed = parseSearchQuery(history);
    const current = data.get("current");
    const { from, to } = current.toJS();

    const query = {};

    if (from !== parsed.from) {
      query.from = from;
    }

    if (to !== parsed.to) {
      query.to = to;
    }

    if (!Object.keys(query).length) {
      return;
    }

    changeQuerySearch(history)(query);
  }

  isActive() {
    const { data } = this.props;
    const current = data.get("current");
    const { from, to } = current.toJS();

    return parseInt(from, 10) > 1 || to;
  }

  render() {
    const { props } = this;
    const { className, data, changeTempFilterRank, userScope, onUpgradePopup } =
      props;
    const current = data.get("current");
    const temp = data.get("temp");
    const isOpen = data.get("isOpen");
    const isActive = this.isActive();
    return (
      <Fragment>
        <div className={classNames("FilterRank", className, { isActive })}>
          <a
            className="Content"
            id="FilterRank"
            tabIndex={1}
            onClick={this._handleEditable.bind(this)}
          >
            <i className="linear-chart-bars" />
            {this._renderTextView(current)}
          </a>

          <FilterRankEditor
            onSubmit={this._handleSubmit.bind(this)}
            currentRange={temp}
            onChange={changeTempFilterRank}
            toggle={this._handleToggleEditor.bind(this)}
            isOpen={isOpen}
          />
        </div>

        <span className="icon mr-2">
          <Tooltip
            disabled={false}
            popperOptions={{
              modifiers: { preventOverflow: { enabled: true, padding: -200 } },
            }}
            position="right"
            title={"Ranking Filter"}
            arrow={true}
          >
            {/* <i className="fas fa-exclamation-circle fa-sm"/> */}
            <img
              className="icon-exclamation-img"
              src="/assets/icons/exclamation-circle.svg"
              alt="exclamation"
            />
          </Tooltip>
        </span>
      </Fragment>
    );
  }

  _handleSubmit() {
    this.props.submitFilterRank().then(() => {
      this.props.triggerSearch();
    });
  }

  _renderTextView(current) {
    const { from, to } = current.toJS();
    const fromText = from === "" ? 1 : formatNumberText(from);

    if (to === "") {
      return fromText + "+";
    }

    const toText = formatNumberText(to);

    return (
      <span>
        {fromText} to {toText}
      </span>
    );
  }

  _handleToggleEditor() {
    this.props.toggleEditFilterRank();
  }

  _handleEditable(e) {
    e.preventDefault();
    const { userScope, onUpgradePopup } = this.props;
    const isUserTrial =
      (userScope.includes("trial") &&
        !userScope.includes("admin") &&
        !userScope.includes("mod")) ||
      false;
    if (isUserTrial) {
      onUpgradePopup();
    } else {
      this.props.openEditFilterRank();
    }
  }
}

FilterRank.propTypes = {
  history: PropTypes.object,
  data: PropTypes.object,
  triggerSearch: PropTypes.func,
  openEditFilterRank: PropTypes.func,
  toggleEditFilterRank: PropTypes.func,
  changeTempFilterRank: PropTypes.func,
  submitFilterRank: PropTypes.func,
};

export default FilterRank;
