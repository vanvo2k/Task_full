import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import timeHuman from "../../../../helpers/time/timeHuman";
import TimeAgo from "../../../../shared-components/TimeAgo";
import ButtonAddFavorites from "../../../add-favorites/shared/ButtonAddFavorites";
import ButtonIgnorePost from "../../../ignore-post/components/ButtonIgnorePost";
import { Link } from "react-router-dom";
import {
  filterRank,
  getLinkImageBestQuality,
} from "../../../../helpers/AmazonHelpers";
import getFileLinks from "../../../../helpers/links/getFileLinks";
import formatPercentIncrease from "../../../../helpers/common/formatPercentIncrease";
import LazyLoad from "react-lazyload";
import Loading from "../../../../shared-components/Loading";
import { FormattedMessage } from "react-intl";
import SimilarProductsLink from "../../../similar-products/shared/SimilarProductsLink";
import LinkRedirectToAmazon from "../../../../shared-components/LinkRedirectToAmazon";
import ButtonCopyToClipboard from "../../../copy-asin/shared/ButtonCopyToClipboard";

class ItemTable extends PureComponent {
  render() {
    const {
      item,
      id,
      index,
      pagination,
      layout,
      triggerSearch,
      mode,
      onUpgradePopup,
      userScope,
      randomArr
    } = this.props;
    const isUserTrial =
      (userScope.includes("trial") &&
        !userScope.includes("admin") &&
        !userScope.includes("mod")) ||
      false;
    const isUserTrialCanSee = randomArr.includes(index)
    if (!id) {
      return null;
    }

    const page = pagination.get("page");
    const perPage = pagination.get("perPage");
    const computed = item.get("computed");

    const rank = item.get("rank");
    const computedOrder = (page - 1) * perPage + index + 1;
    const trend = computed.get("trendy").toJS();
    let { deg, before } = trend;
    const dead = !item.get("alive");
    const thumbnail = getLinkImageBestQuality(item.get("thumbnail"), 300);
    const updatedAt = timeHuman(
      item.get("last_updated_at"),
      "DD-MM-YYYY--HH:mm:ss"
    );
    const type = item.get("type");
    const trending = item.get("trending");
    deg = trending ? (trending * 90) / 100 : deg;
    const percentIncrease =
      rank && before ? ((before - rank) / Math.max(rank, before)) * 100 : 0;
    const brand = item.get("brand");
    const isCropped = !!item.get("cropped");
    const thumbnailCropped = isCropped
      ? item.get("thumbnailCropped")
      : thumbnail;
    const price = item.get("price");
    const preview = isCropped
      ? item.get("preview")
      : getLinkImageBestQuality(item.get("preview"), 600);
    const thumbnailValidated = preview || thumbnailCropped || thumbnail;
    const category = item.get("category") || "clothing";
    const market = item.get("market");
    const currency =
      !market || market === "us" ? "$" : market === "uk" ? "£" : "€";

    const isTrends =
      rank && rank > 0 && rank < 100000 && trending > 20 && !dead;

    return (
      <li
        data-trending={trending || 0}
        className={classNames(
          "TableBody Item ItemTable d-table-row",
          `c-${category}`,
          type,
          layout,
          { dead },
          { cropped: isCropped },
          { trending: isTrends }
        )}
        id={`Item-${id}`}
      >
        <div className="TableCell text-center d-table-cell">
          <span>{computedOrder}</span>
        </div>
        <div
          className={classNames(
            "TableCell rank d-table-cell",
            this._getTrendClassName(deg)
          )}
        >
          <div className="iconWrapper">
            <span
              className="icon"
              style={{ transform: "rotate(" + deg * -1 + "deg)" }}
            >
              <i className="fas fa-long-arrow-alt-right" aria-hidden="true" />
            </span>
          </div>

          <span className="current">{filterRank(item.get("rank"))}</span>

          <div>
            <span className="before">
              {formatPercentIncrease(percentIncrease)}%
            </span>
          </div>
          <div className="Updated">
            <TimeAgo
              formatTime="DD/MM/YYYY"
              time={item.get("date_first_available") || item.get("created")}
            />
          </div>
        </div>
        <div
          className={classNames("TableCell thumbnail d-table-cell", {
            noThumbnail: !thumbnailValidated,
          })}
        >
          <a className="PreviewImage">
            <div
              className="WrapImage"
              style={{
                backgroundImage: "url(" + thumbnailValidated + ")",
              }}
            >
              {isUserTrial && !isUserTrialCanSee ? (
                <img
                  onClick={() => {
                    onUpgradePopup();
                  }}
                  src={thumbnailValidated}
                  alt="thumbnail"
                />
              ) : (
                <img
                  onClick={this._handleClickShowDetail.bind(this)}
                  src={thumbnailValidated}
                  alt="thumbnail"
                />
              )}
            </div>

            <div className="FavoriteAndIgnore">
              <ButtonIgnorePost
                id={id}
                triggerSearch={triggerSearch}
                mode={mode}
              />
              {(!mode || (mode && mode !== "ignore")) && (
                <ButtonAddFavorites product={item} id={id} />
              )}
            </div>
          </a>

          <div className="hover">
            <img src={thumbnailValidated} alt={item.get("name")} />
          </div>
        </div>
        <div className="TableCell ProductInfo d-table-cell">
          <Link
            to={`${isUserTrial && !isUserTrialCanSee ? "#" : `/a/items/${id}`}`}
            onClick={() => {
              if (isUserTrial && !isUserTrialCanSee) {
                onUpgradePopup();
              }
            }}
          >
            {isUserTrial && !isUserTrialCanSee ? "******" : item.get("name")}
          </Link>

          <div className="brand">
            <span className="Title">
              <FormattedMessage id="item.brand" />:{" "}
            </span>
            <span className="Value">
              {isUserTrial && !isUserTrialCanSee ? "******" : brand ? (
                <a
                  href={`/a/items?page=1&term=brand:${encodeURIComponent(
                    item.get("brand")
                  )}&sortByField=rank&searchType=match_phrase`}
                  target="_blank"
                >
                  {item.get("brand")}
                </a>
              ) : (
                "Unknown"
              )}
            </span>
          </div>

          <div className="ASIN">
            <span className="Title">
              <FormattedMessage id="item.ASIN" />:{" "}
            </span>
            <span className="Value">
              {isUserTrial&&!isUserTrialCanSee ? (
                "******"
              ) : (
                <img
                  src={getFileLinks(`/items/${id}/asin.png`)}
                  alt={item.get("name")}
                  className="ASINImg"
                />
              )}

              <ButtonCopyToClipboard
                id={id}
                onUpgradePopup={onUpgradePopup}
                isUserTrial={isUserTrial}
                isUserTrialCanSee={isUserTrialCanSee}
              />
              <LinkRedirectToAmazon
                id={id}
                onUpgradePopup={onUpgradePopup}
                isUserTrial={isUserTrial}
                isUserTrialCanSee={isUserTrialCanSee}
              />
              <SimilarProductsLink
                productId={id}
                onUpgradePopup={onUpgradePopup}
                isUserTrial={isUserTrial}
                isUserTrialCanSee={isUserTrialCanSee}
              />
            </span>
          </div>

          {category !== "popsockets" && (
            <div className="availableAt">
              <span className="Title">
                <FormattedMessage id="item.first_available" />:{" "}
              </span>
              <span className="Value">
                {timeHuman(item.get("date_first_available"), "MMMM D, YYYY") ||
                  "Unknown"}
              </span>
            </div>
          )}
        </div>

        <div className="TableCell Price text-center d-table-cell">
          {!!price && (
            <span>
              {currency}
              {price}
            </span>
          )}
        </div>

        <div
          className="TableCell RankHistory text-center d-table-cell"
          onClick={this._handleClickShowDetail.bind(this)}
        >
          {rank > 0 && (
            <LazyLoad placeholder={<Loading loading={true} />} height={50}>
              <img
                width={100}
                height={50}
                alt={item.get("name")}
                src={getFileLinks(
                  "/items/" + id + "/" + updatedAt + "/ranks.png?width=100"
                )}
              />
            </LazyLoad>
          )}
        </div>
      </li>
    );
  }

  _getTrendClassName(deg) {
    if (deg > 0) {
      return "down";
    } else if (deg < 0) {
      return "up";
    }

    return "unchanged";
  }

  _handleClickShowDetail(e) {
    e.preventDefault();

    const { id, index, showItemDetail } = this.props;
    return showItemDetail({ id, index });
  }
}

ItemTable.defaultProps = {
  layout: "list",
};

ItemTable.propTypes = {
  layout: PropTypes.string,
  item: PropTypes.object.isRequired,
  pagination: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  showItemDetail: PropTypes.func.isRequired,
};

export default ItemTable;
