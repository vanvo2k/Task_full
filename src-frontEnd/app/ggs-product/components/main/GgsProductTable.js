import React, {PureComponent} from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import timeHuman from "../../../../helpers/time/timeHuman"
import TimeAgo from "../../../../shared-components/TimeAgo"
import {Link} from "react-router-dom"
import {filterRank} from "../../../../helpers/AmazonHelpers"
import {FormattedMessage} from "react-intl"

class GgsProductTable extends PureComponent {
    render() {
        const {item, id, index, pagination, layout} = this.props

        if (!id) {
            return null
        }

        const page = pagination.get('page')
        const perPage = pagination.get('perPage')

        const rank = item.get('rank')
        const computedOrder = (page - 1) * perPage + index + 1
        const dead = !item.get('alive')
        const updatedAt = timeHuman(item.get('last_updated_at'), 'DD-MM-YYYY--HH:mm:ss')
        const trending = item.get('trending')
        const deg = trending
        const brand = item.get('brand')
        const minPrice = item.get('minPrice')
        const maxPrice = item.get('maxPrice')
        const preview = item.get('preview')
        const market = item.get('market')
        const currency = (!market || market === 'us') ? '$' : (market === 'uk' ? '£' : '€')

        const isTrends = rank && rank > 0 && rank < 100000 && trending > 20 && !dead

        return (
            <li data-trending={trending || 0}
                className={classNames('TableBody Item ItemTable d-table-row', layout, {dead}, {cropped: true}, {trending: isTrends})}
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

                    <div>
                        <span className="before"></span>
                    </div>
                    <div className="Updated">
                        <TimeAgo formatTime="DD/MM/YYYY"
                                 time={item.get('lastUpdated') || item.get('created')}/>
                    </div>
                </div>
                <div className={classNames("TableCell thumbnail d-table-cell", {noThumbnail: !preview})}>
                    <a className="PreviewImage">
                        <div className="WrapImage" style={{
                            backgroundImage: "url(" + (preview) + ")"
                        }}>
                            <img
                                onClick={this._handleClickShowDetail.bind(this)}
                                src={preview} alt="thumbnail"/>
                        </div>
                    </a>

                    <div className="hover">
                        <img src={preview} alt={item.get('name')}/>
                    </div>
                </div>
                <div className="TableCell ProductInfo d-table-cell">
                    <Link to={`/a/ggs-products/${id}`}>
                        {item.get('name')}
                    </Link>

                    <div className="brand">
                        <span className="Title"><FormattedMessage id="item.brand"/>: </span>
                        <span className="Value">
                            {
                                brand
                                    ?
                                    <a href={`/a/ggs-products?page=1&term=brand:${encodeURIComponent(item.get('brand'))}&sortByField=rank&searchType=match_phrase`}
                                       target="_blank">{item.get('brand')}</a>
                                    : 'Unknown'
                            }
                        </span>
                    </div>

                    <div className="availableAt">
                        <span className="Title"><FormattedMessage id="item.created"/>: </span><span
                        className="Value">{timeHuman(item.get('created'), 'MMMM D, YYYY') || 'Unknown'}</span>
                    </div>

                </div>

                <div className="TableCell Price text-center d-table-cell">
                    {
                        (!!minPrice && !!maxPrice) &&
                        <span>{currency}{minPrice} - {currency}{maxPrice}</span>
                    }
                </div>

                <div className="TableCell RankHistory text-center d-table-cell"
                     onClick={this._handleClickShowDetail.bind(this)}>
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

        const {id, index, showItemDetail} = this.props
        return showItemDetail({id, index})
    }
}

GgsProductTable.defaultProps = {
    layout: 'list'
}

GgsProductTable.propTypes = {
    layout: PropTypes.string,
    item: PropTypes.object.isRequired,
    pagination: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    showItemDetail: PropTypes.func.isRequired,
}

export default GgsProductTable
