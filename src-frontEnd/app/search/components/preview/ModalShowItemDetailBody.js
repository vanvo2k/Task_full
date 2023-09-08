import React, {Component} from "react";
import PropTypes from "prop-types";
import {Row, Col, ModalBody} from "reactstrap";
import {List} from "immutable";
import {Link} from "react-router-dom";
import classNames from "classnames";
import ChartRankItem from "../../../item/components/ChartRankItem";
import timeHuman from "../../../../helpers/time/timeHuman";
import {FormattedMessage} from "react-intl";
import {filterRank, getLinkImageBestQuality} from "../../../../helpers/AmazonHelpers";
import ProductImagePreview from "../../../../shared-components/ProductImagePreview";
import withViewport from "../../../../shared-components/withViewport";
import TimeAgo from "../../../../shared-components/TimeAgo";
import ButtonAddFavorites from "../../../add-favorites/shared/ButtonAddFavorites";
import getLinkProduct from "../../../../helpers/links/getLinkProduct";
import SimilarProductsLink from "../../../similar-products/shared/SimilarProductsLink";
import ButtonCheckTMProduct from "../../../../shared-components/ButtonCheckTMProduct";
import TrademarkPreviewResults from "../../../trademark-preview/TrademarkPreviewResults";
import HighlightedText from "../../../../shared-components/HighlightedText";
import Loading from "../../../../shared-components/Loading";
import LinkRedirectToAmazon from "../../../../shared-components/LinkRedirectToAmazon"
import getFileLinks from "../../../../helpers/links/getFileLinks"
import ButtonCopyToClipboard from "../../../copy-asin/shared/ButtonCopyToClipboard"

class ModalShowItemDetailBody extends Component {
    state = {
        checkedTM: false,
        trademark: {},
        isOpenTMResults: false,
        showResults: [],
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.id !== this.props.id) {
            this._resetCheckTM();
        }
    }

    _resetCheckTM = () => {
        setTimeout(() => {
            this.setState({
                checkedTM: false,
                trademark: {},
                isOpenTMResults: false,
                showResults: [],
            });
        }, 0);
    };

    _handleOnCheckTMResult = (result) => {
        this.setState({
            checkedTM: true,
            trademark: result
        });
    };

    _handleClickShowTMResultsByField = field => e => {
        e.preventDefault();

        const {trademark} = this.state;
        const results = trademark[field] || [];
        this._showTMResults(results);
    };

    _handleClickShowTMResultsByFeature = (index) => e => {
        e.preventDefault();

        const {trademark} = this.state;
        const features = trademark.features || [];
        const results = features[index] || [];

        this._showTMResults(results);
    };

    _showTMResults = (results) => {
        if (!results || !results.length) {
            return;
        }

        this.setState({
            isOpenTMResults: true,
            showResults: results
        });
    };

    _handleCloseShowTMResults = () => {
        this.setState({
            isOpenTMResults: false
        });
    };

    render() {
        const {item, isMobile} = this.props;
        const {id} = this.props;

        if (!id || !item || !item.size) {
            return <Loading/>;
        }

        const brand = item.get('brand');
        const name = item.get('name');
        const cropped = !!item.get('cropped');
        const preview = getLinkImageBestQuality(item.get('preview'));
        const loading = !!item.get('loading');
        const category = item.get('category') || 'clothing';
        const features = item.get('features') || List();
        const featuresSorted = item.get('featuresSorted') || List();
        const featuresIndexing = (featuresSorted && featuresSorted.size) ? featuresSorted : features.map((_, index) => index);

        const {trademark, checkedTM, isOpenTMResults, showResults} = this.state;
        const nameTM = (trademark.name || []).map(tm => tm.wordMark || '');
        const brandTM = (trademark.brand || []).map(tm => tm.wordMark || '');
        const featuresTM = trademark.features || [];
        const market = item.get('market')
        const currency = (!market || market === 'us') ? '$' : (market === 'uk' ? '£' : '€')

        return (
            <ModalBody className={classNames("ModalShowItemDetailBody Body", `c-${category}`, {cropped})}>
                <Row>
                    <Col xs={12} sm={4} className="BodyLeft text-center">
                        <div className="WrapperLeft">
                            <TrademarkPreviewResults isOpen={isOpenTMResults} results={showResults}
                                                     onClose={this._handleCloseShowTMResults}/>
                            <div className="FavoriteAndIgnore">
                                <ButtonAddFavorites enableShortcut forceShow id={id}/>
                            </div>
                            <ProductImagePreview
                                disableLink={isMobile}
                                cropped={cropped} image={preview}
                                link={getLinkProduct(id)}/>
                        </div>
                    </Col>
                    <Col xs={12} sm={8} className="BodyRight">
                        <div className="WrapperBodyRight">
                            <div className="Title">
                                {
                                    !checkedTM ?
                                        <Link to={`/a/items/${id}`}>
                                            {name}
                                        </Link> :
                                        <HighlightedText
                                            onClick={this._handleClickShowTMResultsByField('name')}
                                            text={name} texts={nameTM}/>
                                }
                            </div>
                            <div className="Listed Rank">
                            <span><FormattedMessage
                                id="general.rank"/>:</span> {filterRank(item.get("rank"))}
                            </div>

                            <div className="Listed ASIN">
                                <span><FormattedMessage id="general.ASIN"/>:</span>
                                <img src={getFileLinks(`/items/${id}/asin.png`)} alt={item.get('name')}
                                     className="ASINImg"/>
                                <ButtonCopyToClipboard id={id}/>
                                <LinkRedirectToAmazon className="Link" id={id}>
                                    <i className="linear-launch"/>
                                </LinkRedirectToAmazon>
                                <SimilarProductsLink productId={id}/>
                            </div>

                            {
                                !!brand &&
                                <div className="Listed Brand">
                                    <span><FormattedMessage id="item.brand"/>: </span>
                                    {
                                        !checkedTM ?
                                            <a href={`/a/items?page=1&term=brand:${brand}&sortByField=rank&searchType=match_phrase`}
                                               target="_blank">{brand}</a> :
                                            <HighlightedText
                                                onClick={this._handleClickShowTMResultsByField('brand')}
                                                text={brand} texts={brandTM}/>
                                    }
                                </div>
                            }

                            {
                                features && !!features.size &&
                                <div className="Listed Features">
                                    <span><FormattedMessage id="item.features"/>:</span>

                                    <ul>
                                        {
                                            featuresIndexing.map((index) => {
                                                const feature = features.get(index) || '';
                                                const featureTM = (featuresTM[index] || []).map(tm => tm.wordMark || '');

                                                return (
                                                    <li key={index}>
                                                        {
                                                            !checkedTM ? feature :
                                                                <HighlightedText
                                                                    onClick={this._handleClickShowTMResultsByFeature(index)}
                                                                    text={feature} texts={featureTM}/>
                                                        }
                                                    </li>
                                                );
                                            })
                                        }
                                    </ul>
                                </div>
                            }

                            {
                                item.get("price") &&
                                <div className="Listed Price">
                                    <span><FormattedMessage id="general.price"/>:</span> {currency}{item.get("price")}
                                </div>
                            }

                            <div className="Listed First-available">
                            <span><FormattedMessage
                                id="item.first_available"/>:</span> {timeHuman(item.get("date_first_available"), 'DD/MM/YYYY')}
                            </div>

                            <div className="Listed Updated-at">
                            <span><FormattedMessage
                                id="item.updated_at"/>: </span> <TimeAgo time={item.get("last_updated_at")}/>
                            </div>
                            <ButtonCheckTMProduct id={id} onResult={this._handleOnCheckTMResult}/>
                        </div>
                    </Col>
                </Row>

                <div className="ranks">
                    <ChartRankItem filtering loading={loading} historyDays={7} height={80}
                                   ranks={item.get('ranks') || List()}/>
                </div>
            </ModalBody>
        )
    }
}

ModalShowItemDetailBody.propTypes = {
    isMobile: PropTypes.bool.isRequired,
    item: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
};

export default withViewport(ModalShowItemDetailBody);