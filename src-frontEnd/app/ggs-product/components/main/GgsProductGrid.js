import React, {PureComponent} from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import TimeAgo from "../../../../shared-components/TimeAgo"
import {Link} from "react-router-dom"
import {filterRank} from "../../../../helpers/AmazonHelpers"

class GgsProductGrid extends PureComponent {
    render() {
        const {item, id, layout} = this.props

        if (!id) {
            return null
        }

        const rank = item.get('rank')
        const rankDifference = item.get('rankDifference');
        const dead = !item.get('alive')
        const preview = item.get('preview')
        const trending = item.get('trending')
        const deg = trending
        const minPrice = item.get('minPrice')
        const maxPrice = item.get('maxPrice')
        const market = item.get('market')
        const currency = (!market || market === 'us') ? '$' : (market === 'uk' ? '£' : '€')

        const _showRankDiff = () => {

            if(rankDifference == null){
                return '-';
            }else if(rankDifference > 0){
                return '+' + rankDifference;
            }else{
                return rankDifference;
            }

        }

        const isTrends = rank && rank > 0 && rank < 100000 && trending > 20 && !dead

        return (
            <li data-trending={trending || 0}
                className={classNames('Item ItemGrid GgsProductItem col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6', layout, {dead}, {cropped: true}, {trending: isTrends})}
                id={`Item-${id}`}>
                <div className="Top">
                    <div className={classNames("thumbnail", {noThumbnail: !preview})}
                         onClick={this._handleClickShowDetail}>
                        <a style={{
                            backgroundImage: "url(" + (preview) + ")"
                        }}
                           target="_blank">
                            <img src={preview} alt="thumbnail"/>
                        </a>
                    </div>

                    {
                        (!!minPrice && !!maxPrice) &&
                        <div className="Price text-center">
                            <span>{currency}{minPrice} - {currency}{maxPrice}</span>
                        </div>
                    }
                </div>
                <div className="Bottom">
                    <div className={classNames("rank", this._getTrendClassName(deg))}>
                        <div className="iconWrapper">
                            <span className="icon" style={{transform: "rotate(" + deg * -1 + "deg)"}}>
                                <i className="fas fa-long-arrow-alt-right" aria-hidden="true"/>
                            </span>
                        </div>

                        <span className="current">{filterRank(item.get('rank'))}</span>
                        <span className={classNames('rankDifference',{
                            'rank-plus': rankDifference > 0,
                            'rank-minus': rankDifference < 0,
                        })}>(<span>{_showRankDiff()}</span>)</span>
                    </div>

                    <Link className="Name" to={`/a/ggs-products/${id}`}>
                        {item.get('name')}
                    </Link>

                    <div className="Updated">
                        <TimeAgo formatTime="DD/MM/YYYY"
                                 time={item.get('lastUpdated') || item.get('created')}/>
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
        const {id, index, showItemDetail} = this.props

        showItemDetail && showItemDetail({id, index})
    }
}

GgsProductGrid.defaultProps = {
    layout: 'grid'
}

GgsProductGrid.propTypes = {
    layout: PropTypes.string,
    item: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    showItemDetail: PropTypes.func,
}

export default GgsProductGrid
