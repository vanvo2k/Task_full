import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {getLinkImageBestQuality} from "../../../helpers/AmazonHelpers";
import TimeAgo from "../../../shared-components/TimeAgo";
import formatPercentIncrease from "../../../helpers/common/formatPercentIncrease";
import {Link} from "react-router-dom";
import formatThousandNumber from "../../../helpers/common/formatThousandNumber";
import ButtonAddFavorites from "../../add-favorites/shared/ButtonAddFavorites";
import LinkRedirectToAmazon from "../../../shared-components/LinkRedirectToAmazon"

class ProductItem extends Component {
    _getTrendClassName(deg) {
        if (deg > 0) {
            return "down";
        } else if (deg < 0) {
            return "up";
        }

        return "unchanged";
    }

    render() {
        const {product} = this.props;

        const {_id, preview, type, name, rank, price, brand, date_first_available, trending, computed, alive, market} = product;
        const isCropped = !!product['cropped'];
        const previewUrl = getLinkImageBestQuality(preview, 600);
        const trend = computed['trendy'] || {};
        let {deg, before} = trend;
        deg = trending ? trending * 90 / 100 : deg;
        const percentIncrease = (rank && before) ? (before - rank) / Math.max(rank, before) * 100 : 0;
        const isTrends = rank && rank > 0 && rank < 100000 && trending > 20 && alive;
        const currency = (!market || market === 'us') ? '$' : (market === 'uk' ? '£' : '€')

        return (
            <div
                className={classNames("ProductItem Item ItemGrid col-lg-3 col-sm-6 col-6 grid", type, {cropped: isCropped}, {trending: isTrends})}>
                <div className="Top">
                <div className="FavoriteAndIgnore">
                    <ButtonAddFavorites product={product} id={_id}/>
                </div>
                    <div className="Thumbnail">
                        <Link to={`/a/items/${_id}`}
                              style={{backgroundImage: "url(" + previewUrl + ")"}}>
                            <img src={previewUrl} alt="thumbnail"/>
                        </Link>
                    </div>
                    {
                        !!price &&
                        <div className="Price text-center"><span>{currency}{price}</span></div>
                    }
                </div>
                <div className="Bottom">
                    <div className={classNames("rank", this._getTrendClassName(deg))}>
                        <div className="iconWrapper">
                         <span className="icon"
                               style={{transform: "rotate(" + deg * -1 + "deg)"}}>
                            <i className="fas fa-long-arrow-alt-right" aria-hidden="true"/>
                         </span>
                        </div>

                        <span className="current">{formatThousandNumber(rank)}</span>

                        <div>
                            <span className="before">{formatPercentIncrease(percentIncrease)}%</span>
                        </div>
                    </div>
                    <Link className="Name" to={`/a/items/${_id}`}>{name}</Link>
                    <div className="Brand">
                        <span className="Title">Brand: </span>
                        <span className="Value"><a
                            target="_blank"
                            href={`/a/items?page=1&term=brand:${encodeURIComponent(brand)}&sortByField=rank&searchType=match_phrase`}>{brand}</a>
                            <LinkRedirectToAmazon title={name} id={_id}>
                                <i className="linear-launch"/>
                            </LinkRedirectToAmazon>
                        </span></div>
                    <div className="Updated"><TimeAgo formatTime="DD/MM/YYYY" time={date_first_available}/></div>
                </div>
            </div>
        );
    }
}

ProductItem.propTypes = {
    product: PropTypes.object,
    onUpdate: PropTypes.func
};

export default ProductItem;