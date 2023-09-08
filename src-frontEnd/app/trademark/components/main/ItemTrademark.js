import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import moment from "moment";
import timeAgo from "../../../../helpers/time/timeAgo";
import { injectIntl } from "react-intl";
import getMessageText from "../../../../helpers/i18n/getMessageText";
import HighlightedText from "../../../../shared-components/HighlightedText";

class ItemTrademark extends Component {
  state = {
    refreshing: false,
  };

  _removing = false;
  _intervalDetail = null;
  _totalRefresh = 0;

  componentDidMount() {
    this._refresh();
  }

  componentDidUpdate() {
    this._unRefresh();
  }

  componentWillUnmount() {
    this._intervalDetail && clearInterval(this._intervalDetail);
  }

  _unRefresh() {
    const { item, fetchTrademarkDetail } = this.props;
    this._intervalDetail && clearInterval(this._intervalDetail);

    const status = item.get("status");
    if (status !== "completed") {
      if (this._totalRefresh > 10) {
        return;
      }

      this._intervalDetail = setInterval(() => {
        fetchTrademarkDetail(item.get("_id"));
        this._totalRefresh++;
      }, 2000);
    }
  }

  _refresh() {
    const { item, fetchTrademarkDetail } = this.props;

    const needRefresh = !!item.get("needRefresh");
    const status = item.get("status");
    if (needRefresh && status !== "completed") {
      this._intervalDetail = setInterval(() => {
        fetchTrademarkDetail(item.get("_id"));
        this._totalRefresh++;
      }, 2000);
    } else {
      this._intervalDetail && clearInterval(this._intervalDetail);
    }
  }

  showableResults() {
    const { item } = this.props;
    const results = item.get("results");

    return results && results.size;
  }

  _getLanguageText(key, defaultValue = "") {
    return getMessageText(this.props.intl)(`tm.${key}`, defaultValue);
  }

  _getStatusText(key) {
    return this._getLanguageText(`listStatus.${key}`, key);
  }

  render() {
    const {
      item,
      index,
      meta,
      userScope,
      onUpgradePopup,
      openTrademarkResults,
    } = this.props;
    const isUserTrial =
      (userScope.size <=1 || userScope.includes("trial") &&
        !userScope.includes("admin") &&
        !userScope.includes("mod")) ||
      false;
    const page = meta.get("page");
    const limit = meta.get("limit");
    const order = (page - 1) * limit + index + 1;

    const { refreshing } = this.state;
    const totalWarnings = item.get("totalWarnings") || 0;
    const status = item.get("status");

    const isSafe = totalWarnings <= 0 && status !== "processing";
    const updated = item.get("updated");
    const now = moment();
    const canRefresh = moment(updated).add(1, "hour").isBefore(now);
    const showable = this.showableResults();
    const canMarkRead = totalWarnings > 0 && !item.get("read");
    const classes = classNames(
      "ItemTrademark TableRow d-table-row",
      status,
      { showable },
      { refreshing },
      { notSafe: !isSafe }
    );
    const results = item.get("results");

    const texts = results.map((result) => result.get("wordMark")).toJS();
    const text = item.get("text");

    return (
      <li id={`TM-Item-${item.get("_id")}`} className={classes}>
        <div className="Order TableCell d-table-cell" data-label="#">
          {order}
        </div>

        <div
          onClick={this._handleClickShowResults.bind(this)}
          className="Text TableCell d-table-cell"
          data-label={this._getLanguageText("keywords")}
        >
          <HighlightedText text={text} texts={texts} />
        </div>

        {isUserTrial ? (
          <div
            onClick={() => {
              onUpgradePopup();
            }}
            className="Warnings TableCell d-table-cell"
            data-label={this._getLanguageText("warnings")}
          >
            {totalWarnings}
          </div>
        ) : (
          <div
            onClick={this._handleClickShowResults.bind(this)}
            className="Warnings TableCell d-table-cell"
            data-label={this._getLanguageText("warnings")}
          >
            {totalWarnings}
          </div>
        )}
        <div
          className="Status TableCell d-table-cell"
          data-label={this._getLanguageText("status")}
        >
          {this._getStatusText(item.get("status"))}
        </div>

        <div
          className="Updated TableCell d-table-cell"
          data-label={this._getLanguageText("updated")}
        >
          {timeAgo(updated)}
        </div>

        <div
          className="Actions TableCell d-table-cell"
          data-label={this._getLanguageText("actions")}
        >
          <button
            onClick={this._handleMarkRead.bind(this)}
            disabled={!canMarkRead}
            className={classNames("Read", { canMarkRead })}
          >
            <span className="ion ion-eye" />
          </button>
          <button
            disabled={!canRefresh}
            onClick={this._handleRefresh.bind(this)}
            className={classNames("Refresh", { canRefresh })}
          >
            <span className="ion ion-ios-loop-strong" />
          </button>
          {!isUserTrial && (
            <button
              onClick={this._handleClickRemove.bind(this)}
              className="Icon Remove"
            >
              <span className="ion-ios-trash" />
            </button>
          )}
        </div>
      </li>
    );
  }

  _handleMarkRead() {
    const { item, markReadTrademark } = this.props;

    markReadTrademark(item.get("_id"));
  }

  _handleClickShowResults() {
    const { showTrademarkResults, item, openTrademarkResults } = this.props;
    const showable = this.props;
    if (!showable) {
      return;
    }

    showTrademarkResults(item.get("_id"));
  }

  _handleRefresh() {
    const { item, requestRefreshManual } = this.props;
    const { refreshing } = this.state;

    if (refreshing) {
      return;
    }

    this.setState({
      refreshing: true,
    });

    requestRefreshManual(item.get("_id"))
      .then(() => {
        this.setState({
          refreshing: false,
        });
      })
      .catch((error) => {
        this.setState({
          refreshing: false,
        });
      });
  }

  _handleClickRemove() {
    const { item, deleteTradeMark } = this.props;
    const { removing } = this._removing;
    if (removing) {
      return;
    }

    this._removing = true;

    deleteTradeMark(item.get("_id")).catch((error) => {
      this._removing = false;
    });
  }
}

ItemTrademark.propTypes = {
  index: PropTypes.number,
  item: PropTypes.object,
  meta: PropTypes.object,
  fetchTrademarkDetail: PropTypes.func.isRequired,
  deleteTradeMark: PropTypes.func.isRequired,
  requestRefreshManual: PropTypes.func.isRequired,
  showTrademarkResults: PropTypes.func.isRequired,
  markReadTrademark: PropTypes.func.isRequired,
  intl: PropTypes.object,
};

export default injectIntl(ItemTrademark);
