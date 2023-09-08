import React, {PureComponent} from "react"
import PropTypes from "prop-types"
import {UncontrolledTooltip} from "reactstrap"
import {injectIntl} from "react-intl";
import classNames from "classnames"
import TimeAgo from "../../../../shared-components/TimeAgo"
import ButtonAddFavorites from "../../../add-favorites/shared/ButtonAddFavorites"
import ButtonIgnorePost from "../../../ignore-post/components/ButtonIgnorePost"
import {Link} from "react-router-dom"
import {filterRank, getLinkImageBestQuality} from "../../../../helpers/AmazonHelpers"
import formatPercentIncrease from "../../../../helpers/common/formatPercentIncrease"
import SimilarProductsLink from "../../../similar-products/shared/SimilarProductsLink"
import LinkRedirectToAmazon from "../../../../shared-components/LinkRedirectToAmazon"
import getFileLinks from "../../../../helpers/links/getFileLinks"
import ButtonCopyToClipboard from '../../../copy-asin/shared/ButtonCopyToClipboard'
import getMessageText from "../../../../helpers/i18n/getMessageText";

class ItemGrid extends PureComponent {
    _getLanguageTooltipText(key, defaultValue = '') {
        return getMessageText(this.props.intl)(`tooltip.${key}`, defaultValue);
    }
    render() {
        const {item, id, layout, triggerSearch, mode, onUpgradePopup, userScope, index, randomArr} = this.props
        const isUserTrial = (userScope.includes("trial")&&!userScope.includes("admin")&&!userScope.includes("mod"))||false;
        if (!id) {
            return null
        }
        const isUserTrialCanSee = randomArr.includes(index)
        const computed = item.get('computed')
        const rank = item.get('rank')
        const trend = computed.get('trendy').toJS()
        let {deg, before} = trend
        const dead = !item.get('alive')
        const thumbnail = getLinkImageBestQuality(item.get('thumbnail'), 600)
        const type = item.get('type')
        const trending = item.get('trending')
        deg = trending ? trending * 90 / 100 : deg
        const percentIncrease = (rank && before) ? (before - rank) / Math.max(rank, before) * 100 : 0
        const isCropped = !!item.get('cropped')
        const thumbnailCropped = isCropped ? item.get('thumbnailCropped') : thumbnail
        const price = item.get('price')
        const preview = isCropped ? item.get('preview') : getLinkImageBestQuality(item.get('preview'), 600)
        const thumbnailValidated = preview || thumbnailCropped || thumbnail
        const category = item.get('category') || 'clothing'
        const market = item.get('market')
        const currency = (!market || market === 'us') ? '$' : (market === 'uk' ? '£' : '€')

        const isTrends = rank && rank > 0 && rank < 100000 && trending > 20 && !dead
        const lastUpdated = item.get('last_updated_at')

        return (
            <li data-trending={trending || 0}
                className={classNames('Item ItemGrid col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6', `c-${category}`, type, layout, {dead}, {cropped: isCropped}, {trending: isTrends})}
                id={`Item-${id}`}>
                <div className="Top">
                    <div className="FavoriteAndIgnore">
                        <ButtonIgnorePost id={id} triggerSearch={triggerSearch} mode={mode}/>
                        {(!mode || (mode && mode !== 'ignore')) && <ButtonAddFavorites product={item} id={id}/> }
                    </div>
                    {isUserTrial && !isUserTrialCanSee ? <div className={classNames("thumbnail", {noThumbnail: !thumbnailValidated})}
                         onClick={()=>{ 
                            
                                onUpgradePopup()

                          }
                           }>
                        <a style={{
                            backgroundImage: "url(" + (thumbnailValidated) + ")"
                        }}
                           target="_blank">
                            <img src={thumbnailValidated} alt="thumbnail"/>
                        </a>
                    </div>: <div className={classNames("thumbnail", {noThumbnail: !thumbnailValidated})}
                         onClick={this._handleClickShowDetail.bind(this)}>
                        <a style={{
                            backgroundImage: "url(" + (thumbnailValidated) + ")"
                        }}
                           target="_blank">
                            <img src={thumbnailValidated} alt="thumbnail"/>
                        </a>
                    </div>}

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
                        <span className="current" id={`Rank-${id}`}>{filterRank(item.get('rank'))}</span>

                        <UncontrolledTooltip delay={300} placement="bottom" target={`#Rank-${id}`}>
                            {this._getLanguageTooltipText('current_rank')}
                        </UncontrolledTooltip>

                        <div>
                            <span className="before" id={`Rank-difference-${id}`}>{formatPercentIncrease(percentIncrease)}%</span>

                        <UncontrolledTooltip delay={300} placement="bottom" target={`#Rank-difference-${id}`}>
                            {this._getLanguageTooltipText('rank_difference')}
                        </UncontrolledTooltip>
                        </div>
                    </div>

                    <Link className="Name" to={`${isUserTrial && !isUserTrialCanSee ? "#" : `/a/items/${id}`}`} onClick={()=>{
                        if(isUserTrial && !isUserTrialCanSee){
                            onUpgradePopup()
                        }
                    }}>
                        {isUserTrial && !isUserTrialCanSee ? "******" : item.get('name')}
                    </Link>

                    <div className="ASIN">
                        <span className="Title">ASIN: </span>
                        <span className="Value">
                        {isUserTrial && !isUserTrialCanSee ? "******" : <img src={getFileLinks(`/items/${id}/asin.png`)} alt={item.get('name')}
                                 className="ASINImg"/>}
                            <ButtonCopyToClipboard id={id} onUpgradePopup={onUpgradePopup} isUserTrial={isUserTrial} isUserTrialCanSee={isUserTrialCanSee}/>
                            <LinkRedirectToAmazon id={id} onUpgradePopup={onUpgradePopup} isUserTrial={isUserTrial} isUserTrialCanSee={isUserTrialCanSee}/>
                        </span>

                        <SimilarProductsLink productId={id} onUpgradePopup={onUpgradePopup} isUserTrial={isUserTrial} isUserTrialCanSee={isUserTrialCanSee}/>
                    </div>

                    <div className="Updated d-flex justify-content-between">
                        <span className='PublishedTime'>
                            <span><i className='linear-calendar-check'/></span>&nbsp;<TimeAgo formatTime="DD/MM/YYYY"
                                     time={item.get('date_first_available') || item.get('created')}
                                     alternativeText='Published at'/>
                        </span>

                        <span className='UpdatedTime'>
                            <span><i className='linear-history2'/></span>&nbsp;<TimeAgo formatTime="DD/MM/YYYY"
                                     time={lastUpdated}
                                     alternativeText='Updated at'/>
                        </span>
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

export default injectIntl(ItemGrid)
