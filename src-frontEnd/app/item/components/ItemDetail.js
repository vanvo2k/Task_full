import React, {Component} from "react";
import PropTypes from "prop-types";
import {Col, Row} from "reactstrap";
import {List} from "immutable";
import timeHuman from "../../../helpers/time/timeHuman";
import classNames from "classnames";
import {getLinkImageBestQuality} from "../../../helpers/AmazonHelpers";
import DocTitle from "../../../shared-components/DocTitle";
import getProductTypeText from "../../../helpers/amazon/getProductTypeText";
import ChartHistoryItem from "./ChartHistoryItem";
import {FormattedMessage} from "react-intl";
import ProductImagePreview from "../../../shared-components/ProductImagePreview";
import withViewport from "../../../shared-components/withViewport";
import getLinkProduct from "../../../helpers/links/getLinkProduct";
import ButtonAddFavorites from "../../add-favorites/shared/ButtonAddFavorites";
import TimeAgo from "../../../shared-components/TimeAgo";
import SimilarProducts from "../../similar-products/shared/SimilarProducts";
import CanUseFeatureContainer from "../../../shared-containers/CanUseFeatureContainer";
import HighlightedText from "../../../shared-components/HighlightedText";
import ButtonCheckTMProduct from "../../../shared-components/ButtonCheckTMProduct";
import TrademarkPreviewResults from "../../trademark-preview/TrademarkPreviewResults";
import Loading from "../../../shared-components/Loading";
import formatThousandNumber from "../../../helpers/common/formatThousandNumber"
import LinkRedirectToAmazon from "../../../shared-components/LinkRedirectToAmazon"
import getFileLinks from "../../../helpers/links/getFileLinks"
import ButtonCopyToClipboard from "../../copy-asin/shared/ButtonCopyToClipboard"

class ItemDetail extends Component {
    state = {
        checkedTM: false,
        trademark: {},
        isOpenTMResults: false,
        showResults: [],
        error: ''
    };

    componentDidMount() {
        this._fetchProductDetails();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.id !== this.props.id) {
            this._fetchProductDetails();
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
            })
        }, 0);
    };

    _scrollToTop = () => {
        setTimeout(() => {
            const $header = document.querySelector('.ProductDetails .Header');

            $header && $header.scrollIntoView({
                behavior: 'smooth'
            });
        }, 100);
    };

    _fetchProductDetails = () => {
        const {id, fetchItemDetail} = this.props;
        fetchItemDetail(id)
            .then(() => {
                this._scrollToTop();
            })
            .catch(e => {
                const {message} = e

                this.setState({
                    error: message
                })
            })
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
        const {props} = this;
        const {item, id, isMobile} = props;
        const {error} = this.state

        if (error) {
            return <div className='alert alert-danger'>{error}</div>
        }

        if (!item || !item.size) {
            return <Loading/>;
        }

        const type = item.get('type');
        const name = item.get('name');
        const brand = item.get('brand');
        const cropped = !!item.get('cropped');
        const rank = item.get('rank');
        const alive = item.get('alive');
        const trending = item.get('trending');
        const preview = getLinkImageBestQuality(item.get('preview')) || getLinkImageBestQuality(item.get("thumbnail"));
        const isTrends = rank && rank > 0 && rank < 100000 && trending > 20 && alive;
        const category = item.get('category') || 'clothing';
        const features = item.get('features');
        const featuresSorted = item.get('featuresSorted');
        const featuresIndexing = (featuresSorted && featuresSorted.size) ? featuresSorted : features.map((_, index) => index);

        const {trademark, checkedTM, isOpenTMResults, showResults} = this.state;
        const nameTM = (trademark.name || []).map(tm => tm.wordMark || '');
        const brandTM = (trademark.brand || []).map(tm => tm.wordMark || '');
        const featuresTM = trademark.features || [];
        const market = item.get('market')
        const currency = (!market || market === 'us') ? '$' : (market === 'uk' ? '£' : '€')

        const Brand = brand ?
            <a href={`/a/items?page=1&term=brand:${item.get('brand')}&sortByField=rank&searchType=match_phrase`}
               target="_blank">{item.get('brand')}</a> :
            'Unknown';

        return (
            <DocTitle title={name || 'Item....'}>
                <div className="container">
                    <div
                        className={classNames("ProductDetails ItemDetail", `c-${category}`, `Type-${type}`, {cropped}, {dead: alive === false}, {trending: isTrends})}>
                        <Row className="Header">
                            <Col>
                                <div className="TitleItem">
                                    <h1>
                                        {
                                            !checkedTM ? name :
                                                <HighlightedText
                                                    onClick={this._handleClickShowTMResultsByField('name')}
                                                    text={name} texts={nameTM}/>
                                        }
                                    </h1>
                                </div>

                            </Col>
                        </Row>

                        <Row className="Body">
                            <Col className="text-center Left" sm={4} xs={12}>
                                <div className="WrapperLeft">
                                    <ButtonCheckTMProduct onResult={this._handleOnCheckTMResult} id={id}/>
                                    <TrademarkPreviewResults isOpen={isOpenTMResults} results={showResults}
                                                             onClose={this._handleCloseShowTMResults}/>
                                    <ProductImagePreview
                                        cropped={cropped} name={name} image={preview}
                                        link={getLinkProduct(id)}/>
                                        <div className="FavoriteAndIgnore">
                                            <ButtonAddFavorites enableShortcut forceShow product={item} id={id}/>
                                        </div>
                                </div>
                            </Col>
                            <Col sm={8} xs={12} className="Right">
                                <div className="Rank">
                                    <span><FormattedMessage
                                        id="item.rank"/>: </span> {rank ? formatThousandNumber(rank) : "Not ranked"}
                                </div>

                                <div className="ASIN">
                                    <span><FormattedMessage id="item.ASIN"/>: </span>
                                    <img src={getFileLinks(`/items/${id}/asin.png`)} alt={item.get('name')}
                                         className="ASINImg"/>
                                    <ButtonCopyToClipboard id={id}/>
                                    <LinkRedirectToAmazon className="Link" id={id}>
                                        <i className="linear-launch"/>
                                    </LinkRedirectToAmazon>
                                </div>

                                {
                                    !!item.get("brand") &&
                                    <div className="Brand">
                                        <span><FormattedMessage id="item.brand"/>: </span>

                                        {
                                            !checkedTM ? Brand :
                                                <HighlightedText
                                                    onClick={this._handleClickShowTMResultsByField('brand')}
                                                    text={brand} texts={brandTM}/>
                                        }
                                    </div>
                                }

                                {
                                    (features && !!features.size) &&
                                    <div className="Features">
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
                                    !!item.get("price") &&
                                    <div className="Price">
                                        <span><FormattedMessage id="item.price"/>: </span> {currency}{item.get("price")}
                                    </div>
                                }

                                {
                                    category !== 'popsockets' &&
                                    <div className="First-available">
                                    <span><FormattedMessage
                                        id="item.first_available"/>: </span> {timeHuman(item.get("date_first_available"), 'DD/MM/YYYY')}
                                    </div>
                                }

                                <div className="Type">
                                    <span><FormattedMessage
                                        id="item.type"/>: </span> {getProductTypeText(item.get('type'))}
                                </div>

                                <div className="Updated-at">
                                    <span><FormattedMessage
                                        id="item.updated_at"/>: </span> <TimeAgo
                                    time={item.get("last_updated_at") || ''}/>
                                </div>

                                {
                                    !!item.get("description") &&
                                    <div className="Description">
                                        <span><FormattedMessage
                                            id="item.description"/>: </span> {item.get("description")}
                                    </div>
                                }
                            </Col>
                        </Row>

                        <div className="Histories">
                            <ChartHistoryItem
                                height={isMobile ? 150 : 100}
                                prices={item.get('prices') || List()}
                                ranks={item.get('ranks') || List()}
                            />
                        </div>

                        {
                            !!id &&
                            <CanUseFeatureContainer feature="access-beta" alternative="admin" noAlert>
                                <SimilarProducts withTitle productId={id}/>
                            </CanUseFeatureContainer>
                        }
                    </div>
                </div>
            </DocTitle>
        );
    }
}

ItemDetail.propTypes = {
    id: PropTypes.string.isRequired,
    item: PropTypes.object,
    fetchItemDetail: PropTypes.func.isRequired,
    isMobile: PropTypes.bool.isRequired,
};

export default withViewport(ItemDetail);