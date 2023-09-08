import React, {PureComponent} from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import TimeAgo from "../../../../shared-components/TimeAgo"
import ButtonAddFavorites from "../../../add-favorites/shared/ButtonAddFavorites"
import {Link} from "react-router-dom"
import {filterRank, getLinkImageBestQuality} from "../../../../helpers/AmazonHelpers"
import SimilarProductsLink from "../../../similar-products/shared/SimilarProductsLink"
import LinkRedirectToAmazon from "../../../../shared-components/LinkRedirectToAmazon"
import getFileLinks from "../../../../helpers/links/getFileLinks"
import ButtonCopyToClipboard from "../../../copy-asin/shared/ButtonCopyToClipboard";
import moment from "moment";

class ItemGrid extends PureComponent {
    render() {
        const {item, id, layout} = this.props

        if (!id) {
            return null
        }

        const rank = item.get('rank')
        const thumbnail = getLinkImageBestQuality(item.get('thumbnail'), 600)
        const type = item.get('type')
        const trending = item.get('trending')
        const trendy = item.get('trendy')
        const deg = trending ? trending * 90 / 100 : trendy
        const isCropped = !!item.get('cropped');
        const thumbnailCropped = isCropped ? item.get('thumbnailCropped') : thumbnail
        const price = item.get('price')
        const preview = isCropped ? item.get('preview') : getLinkImageBestQuality(item.get('preview'), 600)
        const thumbnailValidated = preview || thumbnailCropped || thumbnail
        const category = item.get('category') || 'clothing'
        const currency = '$'
        const createdAt = item.get('available') || item.get('date_first_available')

        const isTrends = rank && rank > 0 && rank < 100000 && trending > 20

        return (
            <li data-trending={trending || 0}
                className={classNames('Item ItemGrid col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6', `c-${category}`, type, layout, {cropped: isCropped}, {trending: isTrends})}
                id={`Item-${id}`}>
                <div className="Top">
                <div className="FavoriteAndIgnore">
                    <ButtonAddFavorites product={item} id={id}/>
                </div>

                    <div className={classNames("thumbnail", {noThumbnail: !thumbnailValidated})}
                         onClick={this._handleClickShowDetail}>
                        <a style={{
                            backgroundImage: "url(" + (thumbnailValidated) + ")"
                        }}
                           target="_blank">
                            <img src={thumbnailValidated} alt="thumbnail"/>
                        </a>
                    </div>

                    {
                        !!price &&
                        <div className="Price text-center">
                            <span>{currency}{price}</span>
                        </div>
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

                        <span className="current">{filterRank(item.get('rank'))}</span>
                    </div>

                    <Link className="Name" to={`/a/items/${id}`}>
                        {item.get('name')}
                    </Link>

                    <div className="ASIN">
                        <span className="Title">ASIN: </span>
                        <span className="Value">
                            <img src={getFileLinks(`/items/${id}/asin.png`)} alt={item.get('name')}
                                 className="ASINImg"/>
                                 <ButtonCopyToClipboard id={id}/>
                            <LinkRedirectToAmazon id={id}/>
                        </span>
                        <SimilarProductsLink productId={id}/>
                    </div>

                    <div className="Updated">
                        <TimeAgo formatTime="DD/MM/YYYY"
                                 time={createdAt}/>
                    </div>
                </div>
            </li>
        )
    }

    _getTrendClassName(deg) {
        if (deg > 0) {
            return "down"
        } else if (deg < 0) {
            return "up"
        }

        return "unchanged"
    }

    _handleClickShowDetail = () => {
        const {id, index, showItemDetail, historicalDate} = this.props
        const currentDate = historicalDate.get('current');
        const date = currentDate.get('date');
        const regex = /^\d{2}-\d{2}-\d{4}$/;
        const historicalDay = regex.test(date) ? date : moment().subtract(1, 'd').format('DD-MM-YYYY');

        showItemDetail && showItemDetail({id, index, historicalDay})
    }
}

ItemGrid.defaultProps = {
    layout: 'grid'
}

ItemGrid.propTypes = {
    layout: PropTypes.string,
    item: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    showItemDetail: PropTypes.func,
}

export default ItemGrid
