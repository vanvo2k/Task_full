import React, {PureComponent} from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import timeHuman from "../../../../helpers/time/timeHuman"
import TimeAgo from "../../../../shared-components/TimeAgo"
import ButtonAddFavorites from "../../../add-favorites/shared/ButtonAddFavorites"
import {Link} from "react-router-dom"
import {filterRank, getLinkImageBestQuality} from "../../../../helpers/AmazonHelpers"
import getFileLinks from "../../../../helpers/links/getFileLinks"
import LazyLoad from 'react-lazyload'
import Loading from "../../../../shared-components/Loading"
import {FormattedMessage} from "react-intl"
import SimilarProductsLink from "../../../similar-products/shared/SimilarProductsLink"
import LinkRedirectToAmazon from "../../../../shared-components/LinkRedirectToAmazon"
import ButtonCopyToClipboard from "../../../copy-asin/shared/ButtonCopyToClipboard";
import moment from "moment"

class ItemTable extends PureComponent {
    render() {
        const {item, id, index, pagination, layout} = this.props

        if (!id) {
            return null
        }

        const page = pagination.get('page')
        const perPage = pagination.get('perPage')

        const rank = item.get('rank')
        const computedOrder = (page - 1) * perPage + index + 1
        const thumbnail = getLinkImageBestQuality(item.get('thumbnail'), 300)
        const updatedAt = timeHuman(item.get('updated'), 'DD-MM-YYYY--HH:mm:ss')
        const type = item.get('type')
        const trending = item.get('trending')
        const trendy = item.get('trendy')
        const deg = trending ? trending * 90 / 100 : trendy
        const brand = item.get('brand')
        const isCropped = !!item.get('cropped')
        const thumbnailCropped = isCropped ? item.get('thumbnailCropped') : thumbnail
        const price = item.get('price')
        const preview = isCropped ? item.get('preview') : getLinkImageBestQuality(item.get('preview'), 600)
        const thumbnailValidated = preview || thumbnailCropped || thumbnail
        const category = item.get('category') || 'clothing'
        const currency = '$'

        const isTrends = rank && rank > 0 && rank < 100000 && trending > 20

        return (
            <li data-trending={trending || 0}
                className={classNames('TableBody Item ItemTable d-table-row', `c-${category}`, type, layout, {cropped: isCropped}, {trending: isTrends})}
                id={`Item-${id}`}>
                <div className="TableCell text-center d-table-cell">
                    <span>{computedOrder}</span>
                </div>
                <div className={classNames("TableCell rank d-table-cell", this._getTrendClassName(deg))}>
                    <div className="iconWrapper">
                         <span className="icon"
                               style={{transform: "rotate(" + deg * -1 + "deg)"}}>
                             <i className="fas fa-long-arrow-alt-right" aria-hidden="true"/>
                        </span>
                    </div>

                    <span className="current">{filterRank(item.get('rank'))}</span>
                    <div className="Updated">
                        <TimeAgo formatTime="DD/MM/YYYY"
                                 time={item.get('available') || item.get('date_first_available')}/>
                    </div>
                </div>
                <div className={classNames("TableCell thumbnail d-table-cell", {noThumbnail: !thumbnailValidated})}>
                    <a className="PreviewImage">
                        <div className="WrapImage" style={{
                            backgroundImage: "url(" + (thumbnailValidated) + ")"
                        }}>
                            <img
                                onClick={this._handleClickShowDetail.bind(this)}
                                src={thumbnailValidated} alt="thumbnail"/>
                        </div>
                        <div className="FavoriteAndIgnore">
                            <ButtonAddFavorites product={item} id={id}/>
                        </div>
                    </a>

                    <div className="hover">
                        <img src={thumbnailValidated} alt={item.get('name')}/>
                    </div>
                </div>
                <div className="TableCell ProductInfo d-table-cell">
                    <Link to={`/a/items/${id}`}>
                        {item.get('name')}
                    </Link>

                    <div className="brand">
                        <span className="Title"><FormattedMessage id="item.brand"/>: </span>
                        <span className="Value">
                            {
                                brand
                                    ?
                                    <a href={`/a/items?page=1&term=brand:${encodeURIComponent(item.get('brand'))}&sortByField=rank&searchType=match_phrase`}
                                       target="_blank">{item.get('brand')}</a>
                                    : 'Unknown'
                            }
                        </span>
                    </div>

                    <div className="ASIN">
                        <span className="Title"><FormattedMessage id="item.ASIN"/>: </span>
                        <span className="Value">
                            <img src={getFileLinks(`/items/${id}/asin.png`)} alt={item.get('name')}
                                 className="ASINImg"/>
                                 <ButtonCopyToClipboard id={id}/>
                            <LinkRedirectToAmazon id={id}/>
                            <SimilarProductsLink productId={id}/>
                        </span>
                    </div>
                </div>

                <div className="TableCell Price text-center d-table-cell">
                    {
                        !!price &&
                        <span>{currency}{price}</span>
                    }
                </div>

                <div className="TableCell RankHistory text-center d-table-cell"
                     onClick={this._handleClickShowDetail.bind(this)}>
                    {
                        (rank > 0) &&
                        <LazyLoad placeholder={<Loading loading={true}/>} height={50}>
                            <img width={100} height={50} alt={item.get('name')}
                                 src={getFileLinks('/items/' + id + '/' + updatedAt + '/ranks.png?width=100')}/>
                        </LazyLoad>
                    }
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

    _handleClickShowDetail(e) {
        e.preventDefault()

        const {id, index, showItemDetail, historicalDate} = this.props
        const currentDate = historicalDate.get('current');
        const date = currentDate.get('date');
        const regex = /^\d{2}-\d{2}-\d{4}$/;
        const historicalDay = regex.test(date) ? date : moment().subtract(1, 'd').format('DD-MM-YYYY');

        showItemDetail && showItemDetail({id, index, historicalDay})
    }
}

ItemTable.defaultProps = {
    layout: 'list'
}

ItemTable.propTypes = {
    layout: PropTypes.string,
    item: PropTypes.object.isRequired,
    pagination: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    showItemDetail: PropTypes.func.isRequired,
}

export default ItemTable
